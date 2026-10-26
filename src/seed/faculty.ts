import { load } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

type FacultySeed = {
  biography?: string
  departmentSlug: string
  designation: string
  email?: string
  name: string
  qualification?: string
  slug: string
  sortOrder: number
  vidwanId?: string
}

const departmentSources = [
  { departmentSlug: 'cse', file: 'cse.html' },
  { departmentSlug: 'it', file: 'it.html' },
  { departmentSlug: 'ece', file: 'ece.html' },
  { departmentSlug: 'eee', file: 'eee.html' },
  { departmentSlug: 'applied-sciences', file: 'ap.html' },
]

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const decodeCloudflareEmail = (encoded: string): string | undefined => {
  if (!/^[0-9a-f]+$/i.test(encoded) || encoded.length < 4 || encoded.length % 2 !== 0) {
    return undefined
  }

  const key = Number.parseInt(encoded.slice(0, 2), 16)
  let email = ''

  for (let index = 2; index < encoded.length; index += 2) {
    email += String.fromCharCode(Number.parseInt(encoded.slice(index, index + 2), 16) ^ key)
  }

  return email.includes('@') ? email : undefined
}

const readFacultySeeds = async (): Promise<FacultySeed[]> => {
  const seeds: FacultySeed[] = []
  const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')

  for (const source of departmentSources) {
    const html = await readFile(path.join(pagesDirectory, source.file), 'utf8')
    const $ = load(html)
    let sortOrder = 0

    $('#firstshift tr, #secondshift tr').each((_rowIndex, row) => {
      const facultyRow = $(row)
      const heading = facultyRow
        .find('p')
        .filter((_index, paragraph) =>
          ($(paragraph).attr('style') || '').toLowerCase().includes('font-weight: bold'),
        )
        .first()
      const profile = facultyRow.find('.faculty-description').first()

      if (!heading.length || !profile.length) {
        return
      }

      const headingWithLines = heading.clone()
      headingWithLines.find('br').replaceWith('\n')
      const headingLines = headingWithLines.text().split('\n').map(normalizeText).filter(Boolean)

      if (headingLines.length < 2) {
        return
      }

      const name = normalizeText(headingLines[0].split('|')[0])
      const details = headingLines.slice(1).join(' | ')
      const detailParts = details.split('|').map(normalizeText).filter(Boolean)
      const designation = detailParts[0]
      const qualification = detailParts
        .slice(1)
        .filter((part) => part.toLowerCase() !== 'hod' && !/shift/i.test(part))
        .join(', ')

      if (!name || !designation) {
        return
      }

      const protectedEmail = facultyRow.find('[data-cfemail]').first().attr('data-cfemail')
      const email = protectedEmail ? decodeCloudflareEmail(protectedEmail) : undefined
      const profileText = normalizeText(profile.text())
      const vidwanMatch = profileText.match(/vidwan\s*(?:id)?\s*[-:]?\s*(\d+)/i)
      const biographyParagraphs: string[] = []

      profile.find('p').each((_paragraphIndex, paragraphElement) => {
        const paragraph = $(paragraphElement).clone()
        const originalText = normalizeText(paragraph.text())

        if (/^vidwan\s*(?:id)?/i.test(originalText)) {
          return
        }

        paragraph.find('a[href$=".pdf"]').remove()
        const text = normalizeText(paragraph.text())

        if (text && !/^det(?:ailed|iled) profile$/i.test(text)) {
          biographyParagraphs.push(text)
        }
      })

      sortOrder += 10
      seeds.push({
        biography: biographyParagraphs.join('\n\n') || undefined,
        departmentSlug: source.departmentSlug,
        designation,
        email,
        name,
        qualification: qualification || undefined,
        slug: `${slugify(name)}-${source.departmentSlug}`,
        sortOrder,
        vidwanId: vidwanMatch?.[1],
      })
    })
  }

  return seeds
}

export const seedFaculty = async (payload: Payload): Promise<void> => {
  const departmentIds = new Map<string, number>()

  for (const source of departmentSources) {
    const department = await payload.find({
      collection: 'departments',
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: source.departmentSlug,
        },
      },
    })
    const departmentId = department.docs[0]?.id

    if (!departmentId) {
      throw new Error(`Department ${source.departmentSlug} must be seeded before faculty`)
    }

    departmentIds.set(source.departmentSlug, departmentId)
  }

  const facultySeeds = await readFacultySeeds()
  const vidwanIdCounts = new Map<string, number>()

  for (const faculty of facultySeeds) {
    if (faculty.vidwanId) {
      vidwanIdCounts.set(faculty.vidwanId, (vidwanIdCounts.get(faculty.vidwanId) || 0) + 1)
    }
  }

  const duplicateVidwanIds = new Set(
    [...vidwanIdCounts.entries()].filter(([, count]) => count > 1).map(([id]) => id),
  )

  if (duplicateVidwanIds.size > 0) {
    payload.logger.warn(
      `Skipped ${duplicateVidwanIds.size} conflicting Vidwan ID value(s) found in the source pages`,
    )
  }

  let created = 0
  let skipped = 0

  for (const faculty of facultySeeds) {
    const existing = await payload.find({
      collection: 'faculty',
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: faculty.slug,
        },
      },
    })

    if (existing.docs[0]) {
      skipped += 1
      continue
    }

    const department = departmentIds.get(faculty.departmentSlug)

    if (!department) {
      throw new Error(`No department ID found for ${faculty.departmentSlug}`)
    }

    await payload.create({
      collection: 'faculty',
      data: {
        _status: 'draft',
        biography: faculty.biography,
        department,
        designation: faculty.designation,
        email: faculty.email,
        name: faculty.name,
        qualifications: faculty.qualification
          ? [{ qualification: faculty.qualification }]
          : undefined,
        slug: faculty.slug,
        sortOrder: faculty.sortOrder,
        vidwanId:
          faculty.vidwanId && !duplicateVidwanIds.has(faculty.vidwanId)
            ? faculty.vidwanId
            : undefined,
      },
      draft: true,
      overrideAccess: true,
    })
    created += 1
  }

  payload.logger.info(
    `Seeded ${created} faculty drafts; left ${skipped} existing records unchanged`,
  )
}

export { readFacultySeeds }
