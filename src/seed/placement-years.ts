import { load } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

type PlacementStatistics = {
  averagePackageLpa?: number
  highestPackageLpa?: number
  medianPackageLpa?: number
  offerCount?: number
  placementStatus: 'final' | 'ongoing'
  year: number
}

type LegacyEvidence = {
  label: string
  url: string
}

type PlacementYearSeed = PlacementStatistics & {
  legacyEvidence: LegacyEvidence[]
}

const sourceSnapshotFile = 'docs/references/snapshot/pages/placements.html'
const sourceUrl = 'https://msit.in/placements'

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const absoluteLegacyUrl = (value: string): string => new URL(value, 'https://msit.in').href

const parseNumber = (value: string): number | undefined => {
  const match = value.match(/\d+(?:\.\d+)?/)
  if (!match) return undefined

  const number = Number.parseFloat(match[0])
  return Number.isFinite(number) ? number : undefined
}

export const readPlacementYearSeeds = async (): Promise<PlacementYearSeed[]> => {
  const html = await readFile(path.join(process.cwd(), sourceSnapshotFile), 'utf8')
  const $ = load(html)
  const statistics = new Map<number, PlacementStatistics>()
  const reports = new Map<number, LegacyEvidence>()

  $('table').each((_tableIndex, table) => {
    const rows = $(table).find('tr').toArray()
    const headings = rows[0]
      ? $(rows[0])
          .find('th, td')
          .toArray()
          .map((cell) => normalizeText($(cell).text()))
      : []

    if (!headings.some((heading) => /Highest Pkg/i.test(heading))) return
    if (!headings.some((heading) => /Median Salary/i.test(heading))) return

    for (const row of rows.slice(1)) {
      const cells = $(row)
        .find('th, td')
        .toArray()
        .map((cell) => normalizeText($(cell).text()))
      const yearMatch = cells[0]?.match(/^(\d{4})(?:\s*\(([^)]+)\))?$/)
      if (!yearMatch) continue

      const year = Number.parseInt(yearMatch[1], 10)
      statistics.set(year, {
        averagePackageLpa: parseNumber(cells[4] || ''),
        highestPackageLpa: parseNumber(cells[2] || ''),
        medianPackageLpa: parseNumber(cells[3] || ''),
        offerCount: parseNumber(cells[1] || ''),
        placementStatus: /ongoing/i.test(yearMatch[2] || '') ? 'ongoing' : 'final',
        year,
      })
    }
  })

  $('.centralcontent a[href]').each((_index, anchor) => {
    const label = normalizeText($(anchor).text())
    const yearMatch = label.match(/^Placements?\s+(\d{4})$/i)
    const href = ($(anchor).attr('href') || '').trim()
    if (!yearMatch || !href) return

    const year = Number.parseInt(yearMatch[1], 10)
    reports.set(year, { label, url: absoluteLegacyUrl(href) })
  })

  const years = new Set([...statistics.keys(), ...reports.keys()])

  return [...years]
    .sort((left, right) => right - left)
    .map((year) => ({
      ...(statistics.get(year) || { placementStatus: 'final' as const, year }),
      legacyEvidence: reports.has(year) ? [reports.get(year)!] : [],
    }))
}

export const seedPlacementYears = async (payload: Payload): Promise<void> => {
  const [seeds, existingResult] = await Promise.all([
    readPlacementYearSeeds(),
    payload.find({
      collection: 'placement-years',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
  ])
  const existingYears = new Set(existingResult.docs.map((item) => item.year))
  let created = 0
  let skipped = 0

  for (const seed of seeds) {
    if (existingYears.has(seed.year)) {
      skipped += 1
      continue
    }

    const hasStatistics = seed.offerCount !== undefined

    await payload.create({
      collection: 'placement-years',
      data: {
        _status: 'draft',
        averagePackageLpa: seed.averagePackageLpa,
        highestPackageLpa: seed.highestPackageLpa,
        legacyEvidence: seed.legacyEvidence,
        medianPackageLpa: seed.medianPackageLpa,
        offerCount: seed.offerCount,
        placementStatus: seed.placementStatus,
        reviewStatus: hasStatistics ? 'needs-confirmation' : 'unreviewed',
        sourceSnapshotFile,
        sourceUrl,
        statisticsNote: hasStatistics
          ? 'The source labels the count as “Job Heads”. Confirm that it means placement offers before publishing.'
          : undefined,
        year: seed.year,
      },
      draft: true,
      overrideAccess: true,
    })
    existingYears.add(seed.year)
    created += 1
  }

  payload.logger.info(
    `Seeded ${created} placement-year drafts; left ${skipped} existing records unchanged`,
  )
}
