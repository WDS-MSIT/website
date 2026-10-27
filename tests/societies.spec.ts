import { readFileSync } from 'fs'
import path from 'path'

import { describe, expect, it } from 'vitest'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'
import { Societies } from '@/collections/Societies'
import { parseSocietySeeds } from '@/seed/societies'

const html = readFileSync(
  path.join(process.cwd(), 'docs/references/snapshot/pages/society.html'),
  'utf8',
)
const { seeds, issues } = parseSocietySeeds(html)

const bySlug = new Map(seeds.map((seed) => [seed.slug, seed]))

describe('society seed parsing', () => {
  it('parses every source tab without issues', () => {
    expect(issues).toEqual([])
    expect(seeds).toHaveLength(17)
    expect(new Set(seeds.map((seed) => seed.slug)).size).toBe(17)
  })

  it('assigns one of the editorial categories and a unique sort order', () => {
    const categories = new Set(['cultural', 'technical', 'academic'])
    const sortOrders = new Set(seeds.map((seed) => seed.sortOrder))

    for (const seed of seeds) {
      expect(categories.has(seed.category)).toBe(true)
    }

    expect(sortOrders.size).toBe(seeds.length)
    expect(seeds.filter((seed) => seed.category === 'academic').map((seed) => seed.slug)).toEqual([
      'ndli-club',
      'spark',
    ])
  })

  it('keeps a verbatim overview for societies with introductory prose', () => {
    expect(bySlug.get('nss')?.overview).toContain('formed in Maharaja Surajmal Institute of Technology')
    expect(bySlug.get('ieee')?.overview).toContain('Established in 2009')
    expect(bySlug.get('mlsa')?.overview).toContain('MICROSOFT LEARN STUDENT AMBASSADOR')
    expect(bySlug.get('iste')?.overview).toBeUndefined()
    expect(bySlug.get('spark')?.overview).toBeUndefined()
  })

  it('records founding dates only where the source states them', () => {
    expect(bySlug.get('nss')?.foundedOn).toBe('2019-09-19')
    expect(bySlug.get('prakriti')?.foundedOn).toBe('2010-03-03')
    expect(bySlug.get('cerebrate')?.foundedYear).toBe(2016)
    expect(bySlug.get('ieee')?.foundedYear).toBe(2009)
    expect(bySlug.get('e-yantra')?.foundedOn).toBeUndefined()
    expect(bySlug.get('e-yantra')?.foundedYear).toBeUndefined()
  })

  it('keeps Mutants sub-societies as units and deduplicates its repeated coordinator', () => {
    const mutants = bySlug.get('mutants')
    const names = mutants?.studentLeaders.map((person) => person.name) || []

    expect(names.filter((name) => name === 'J Ashwin Nair')).toHaveLength(1)
    expect(mutants?.studentLeaders.find((person) => person.name === 'J Ashwin Nair')?.unit).toBe(
      'OCTAVE',
    )
    expect(names).toHaveLength(5)
  })

  it('parses faculty and student coordinators from the source', () => {
    expect(bySlug.get('ieee')?.facultyCoordinators).toHaveLength(4)
    expect(bySlug.get('ieee')?.facultyCoordinators[0]).toMatchObject({
      name: 'Anupama Kaushik',
      designation: 'Associate Professor',
      department: 'IT',
      role: 'Branch Counselor',
    })
    expect(bySlug.get('spark')?.studentLeaders).toHaveLength(17)
  })

  it('classifies links and keeps contact emails out of link fields', () => {
    const nss = bySlug.get('nss')

    expect(nss?.links.map((link) => link.type)).toEqual(['form', 'document', 'document'])
    expect(bySlug.get('ieee')?.links.every((link) => link.type === 'social')).toBe(true)
    expect(bySlug.get('ndli-club')?.contactEmails).toEqual(['ndliclub@msit.in'])
  })

  it('keeps provenance for every record', () => {
    for (const seed of seeds) {
      expect(seed.sourceUrl).toBe(`https://msit.in/society#${seed.slug}`)
      expect(seed.sourceSnapshotFile).toBe('docs/references/snapshot/pages/society.html')
      expect(seed.legacyPath).toBe('/society')
    }
  })

  it('handles a page with no society tabs without throwing', () => {
    expect(parseSocietySeeds('<html><body></body></html>')).toEqual({
      seeds: [],
      issues: ['No .tab-pane elements found in society.html'],
    })
  })
})

describe('societies collection', () => {
  it('restricts writes to superadmins and reads to published content', () => {
    expect(Societies.access?.create).toBe(superadminOnly)
    expect(Societies.access?.update).toBe(superadminOnly)
    expect(Societies.access?.delete).toBe(superadminOnly)
    expect(Societies.access?.read).toBe(publishedOrSuperadmin)
  })

  it('keeps drafts enabled for imported records', () => {
    const versions = Societies.versions
    expect(versions && typeof versions === 'object' ? versions.drafts : false).toBe(true)
  })
})
