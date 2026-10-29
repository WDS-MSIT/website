import { createHash } from 'crypto'
import { load } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

type ReviewStatus = 'needs-confirmation' | 'unreviewed'

type EventSeed = {
  allDay: boolean
  deliveryMode: 'hybrid' | 'in-person' | 'online'
  departmentSlugs: string[]
  endsAt?: string
  legacyImages: { url: string }[]
  legacyReports: { label: string; url: string }[]
  organisers: { name: string }[]
  registrationUrl?: string
  reviewStatus: ReviewStatus
  slug: string
  societySlugs: string[]
  sourceOrder: number
  startsAt?: string
  summary: string
  title: string
  venue?: string
}

type DateParts = {
  day: number
  month: number
  year: number
}

type Schedule = {
  allDay: boolean
  endsAt?: string
  reviewStatus: ReviewStatus
  startsAt?: string
}

const sourceSnapshotFile = 'docs/references/snapshot/pages/events.html'
const sourceUrl = 'https://msit.in/events'

const monthNumbers: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
}

const departmentPatterns: Array<{ pattern: RegExp; slug: string }> = [
  {
    pattern: /\b(?:computer science(?:\s*(?:and|&)\s*engineering)?|CSE)\b/i,
    slug: 'cse',
  },
  {
    pattern: /\b(?:information technology|IT)\s*(?:department|dept\.?|[-–—][EM])?\b/i,
    slug: 'it',
  },
  {
    pattern: /\b(?:electronics\s*(?:and|&)\s*communication(?: engineering)?|ECE)\b/i,
    slug: 'ece',
  },
  {
    pattern: /\b(?:electrical\s*(?:and|&)\s*electronics(?: engineering)?|EEE)\b/i,
    slug: 'eee',
  },
  {
    pattern: /\b(?:applied sciences?|applied science department)\b/i,
    slug: 'applied-sciences',
  },
]

const societyPatterns: Array<{ pattern: RegExp; slug: string }> = [
  { pattern: /\bNSS(?: MSIT)?\b/i, slug: 'nss' },
  { pattern: /\bPrakriti\b|\bEco\s*Club\b/i, slug: 'prakriti' },
  { pattern: /\bIEEE(?:[-\s]MSIT)?\b/i, slug: 'ieee' },
  { pattern: /\bISTE(?: MSIT)?\b/i, slug: 'iste' },
  { pattern: /\bGeek\s*Room\b/i, slug: 'geek-room' },
  { pattern: /\bGDSC\b/i, slug: 'gdsc' },
  { pattern: /\bTechSoc\b/i, slug: 'techsoc' },
  { pattern: /\bNDLI(?: Club)?\b/i, slug: 'ndli-club' },
  { pattern: /\bE-?Yantra\b/i, slug: 'e-yantra' },
]

const organiserPatterns: Array<{ name: string; pattern: RegExp }> = [
  { name: 'Training & Placement Cell', pattern: /\btraining\s*(?:&|and)\s*placement cell\b/i },
  { name: 'Placement Cell', pattern: /\bplacement cell\b/i },
  {
    name: 'E-Cell / Incubation Cell MSIT',
    pattern: /\b(?:e-?cell|incubation cell)(?: MSIT)?\b/i,
  },
  {
    name: "Institution's Innovation Council (IIC)",
    pattern: /\b(?:IIC|institution'?s innovation council|innovation cell)\b/i,
  },
  { name: 'Unnat Bharat Abhiyan (UBA)', pattern: /\b(?:UBA|unnat bharat abhiyan)\b/i },
  {
    name: 'Personality Assessment and Development Cell',
    pattern: /\bpersonality assessment and development cell\b/i,
  },
  { name: 'Viksit Bharat Cell', pattern: /\bviksit bharat cell\b/i },
  { name: 'IPR Cell', pattern: /\bIPR cell\b/i },
  { name: 'Career Development Cell', pattern: /\b(?:CDC|career development cell)\b/i },
  { name: 'MSIT Alumni Association', pattern: /\bMSIT Alumni Association\b/i },
]

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

const absoluteLegacyUrl = (value: string): string => new URL(value, sourceUrl).href

const isDocumentUrl = (value: string): boolean => {
  const pathname = new URL(value, sourceUrl).pathname
  return /\.(?:docx?|pdf|pptx?|rtf|xlsx?)$/i.test(pathname)
}

const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100)
    .replace(/-$/, '')

const shortHash = (value: string): string =>
  createHash('sha256').update(value).digest('hex').slice(0, 8)

const normalizedYear = (value: string): number => {
  const year = Number.parseInt(value, 10)
  if (value.length === 2) return year >= 50 ? 1900 + year : 2000 + year
  return year
}

const dateParts = (day: string, month: string, year: string): DateParts | undefined => {
  const parsed = {
    day: Number.parseInt(day, 10),
    month: monthNumbers[month.toLowerCase()] || Number.parseInt(month, 10),
    year: normalizedYear(year),
  }
  const date = new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day))

  if (
    date.getUTCFullYear() !== parsed.year ||
    date.getUTCMonth() !== parsed.month - 1 ||
    date.getUTCDate() !== parsed.day
  ) {
    return undefined
  }

  return parsed
}

const timeFromText = (text: string): { hour: number; minute: number } | undefined => {
  const match = text.match(/\b(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)\b/i)
  if (!match) return undefined

  let hour = Number.parseInt(match[1], 10)
  const minute = Number.parseInt(match[2] || '0', 10)
  const meridiem = match[3].toLowerCase().replace(/\./g, '')

  if (hour < 1 || hour > 12 || minute > 59) return undefined
  if (meridiem === 'pm' && hour !== 12) hour += 12
  if (meridiem === 'am' && hour === 12) hour = 0

  return { hour, minute }
}

const toIso = (
  date: DateParts | undefined,
  time?: { hour: number; minute: number },
): string | undefined => {
  if (!date) return undefined

  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')

  if (!time) return `${date.year}-${month}-${day}T12:00:00.000Z`

  const hour = String(time.hour).padStart(2, '0')
  const minute = String(time.minute).padStart(2, '0')
  return new Date(`${date.year}-${month}-${day}T${hour}:${minute}:00+05:30`).toISOString()
}

const parseSchedule = (text: string): Schedule => {
  const month = Object.keys(monthNumbers).join('|')
  const suffix = '(?:st|nd|rd|th)?'
  const time = timeFromText(text)
  let start: DateParts | undefined
  let end: DateParts | undefined

  const fullRange = text.match(
    new RegExp(
      `(?:from\\s+)?(\\d{1,2})${suffix}\\s+(${month})(?:,?\\s+(\\d{2,4}))?\\s+(?:to|[-–—])\\s*(\\d{1,2})${suffix}\\s+(${month}),?\\s+(\\d{2,4})`,
      'i',
    ),
  )

  if (fullRange) {
    const endYear = fullRange[6]
    start = dateParts(fullRange[1], fullRange[2], fullRange[3] || endYear)
    end = dateParts(fullRange[4], fullRange[5], endYear)
  }

  if (!start) {
    const sharedMonthRange = text.match(
      new RegExp(
        `(\\d{1,2})${suffix}\\s*(?:to|and|&|[-–—])\\s*(\\d{1,2})${suffix}\\s+(${month}),?\\s+(\\d{2,4})`,
        'i',
      ),
    )

    if (sharedMonthRange) {
      start = dateParts(sharedMonthRange[1], sharedMonthRange[3], sharedMonthRange[4])
      end = dateParts(sharedMonthRange[2], sharedMonthRange[3], sharedMonthRange[4])
    }
  }

  if (!start) {
    const monthFirstRange = text.match(
      new RegExp(
        `(${month})\\s+(\\d{1,2})${suffix}\\s*(?:to|and|&|[-–—])\\s*(\\d{1,2})${suffix},?\\s+(\\d{2,4})`,
        'i',
      ),
    )

    if (monthFirstRange) {
      start = dateParts(monthFirstRange[2], monthFirstRange[1], monthFirstRange[4])
      end = dateParts(monthFirstRange[3], monthFirstRange[1], monthFirstRange[4])
    }
  }

  if (!start) {
    const numeric = text.match(/\b([0-3]?\d)[./-]([01]?\d)[./-](\d{2,4})\b/)
    if (numeric) start = dateParts(numeric[1], numeric[2], numeric[3])
  }

  if (!start) {
    const dayFirst = text.match(
      new RegExp(`\\b(\\d{1,2})${suffix}\\s+(${month}),?\\s+(\\d{2,4})\\b`, 'i'),
    )
    if (dayFirst) start = dateParts(dayFirst[1], dayFirst[2], dayFirst[3])
  }

  if (!start) {
    const monthFirst = text.match(
      new RegExp(`\\b(${month})\\s+(\\d{1,2})${suffix},?\\s+(\\d{2,4})\\b`, 'i'),
    )
    if (monthFirst) start = dateParts(monthFirst[2], monthFirst[1], monthFirst[3])
  }

  const startsAt = toIso(start, time)

  return {
    allDay: !time,
    endsAt: toIso(end),
    reviewStatus: startsAt ? 'unreviewed' : 'needs-confirmation',
    startsAt,
  }
}

const meaningfulTitle = (value: string): boolean => {
  const title = normalizeText(value).replace(/^[:\s-]+|[.:\s-]+$/g, '')
  if (title.length < 5 || title.length > 180) return false
  if (/^(?:report|click here|read more)$/i.test(title)) return false
  return !/^\d{1,2}(?:st|nd|rd|th)?\s+/i.test(title)
}

const usefulTitleCandidate = (value: string): boolean => {
  const title = normalizeText(value)

  if (!meaningfulTitle(title)) return false
  if (/^by\b/i.test(title)) return false
  if (/\b(?:organized|organised|conducted|coordinated)\b/i.test(title)) return false
  if (
    /^(?:the\s+)?(?:department of\s+)?(?:computer science(?: and engineering)?|information technology|electronics and communication engineering|electrical and electronics engineering|applied sciences|CSE|IT|ECE|EEE)(?:\s+department)?[.,]?$/i.test(
      title,
    )
  ) {
    return false
  }

  return true
}

const titleFromReportUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined

  const basename = decodeURIComponent(new URL(url).pathname.split('/').pop() || '')
    .replace(/\.(?:docx?|pdf|pptx?|rtf|xlsx?)$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b(?:final|converted|formatted|merged)\b/gi, ' ')
    .replace(/\breport\b/gi, ' ')
    .replace(
      /\b\d{1,2}(?:st|nd|rd|th)?\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s*\d{0,4}\b/gi,
      ' ',
    )
    .replace(/\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!usefulTitleCandidate(basename)) return undefined
  return `${basename.charAt(0).toUpperCase()}${basename.slice(1)}`
}

const titleFromText = (summary: string, emphasized: string[], reportUrl?: string): string => {
  const quotes = [...summary.matchAll(/"([^"\n]{5,180})"/g)]
    .map((match) => normalizeText(match[1]))
    .filter(usefulTitleCandidate)
    .sort((left, right) => right.length - left.length)

  if (quotes[0]) return quotes[0]

  const emphasis = emphasized
    .map(normalizeText)
    .filter(usefulTitleCandidate)
    .filter((value) => !/\breport\b/i.test(value))
    .sort((left, right) => right.length - left.length)

  if (emphasis[0]) return emphasis[0]

  const afterAction = summary.match(
    /(?:organized|organised|conducted|coordinated|held|celebrated|hosted)\s+(?:an?\s+|the\s+|its\s+)?(.{5,160}?)(?=\s+(?:on|from|at|for|by|in collaboration)\b|[.])/i,
  )?.[1]
  if (afterAction && usefulTitleCandidate(afterAction)) {
    return normalizeText(afterAction).replace(/\s+held$/i, '')
  }

  const beforeAction = summary.match(
    /^(.{5,160}?)\s+(?:was\s+)?(?:conducted|organized|organised|coordinated|held|celebrated)\b/i,
  )?.[1]
  if (beforeAction && usefulTitleCandidate(beforeAction)) return normalizeText(beforeAction)

  const topic = summary.match(
    /\b(?:seminar|webinar|workshop|session|lecture|talk|FDP|programme|program)\s+(?:entitled|titled|on|about)\s+(.{5,160}?)(?=\s+(?:on|from|at)\s+\d|[.])/i,
  )?.[1]
  if (topic && usefulTitleCandidate(topic)) return normalizeText(topic)

  const reportTitle = titleFromReportUrl(reportUrl)
  if (reportTitle) return reportTitle

  return normalizeText(summary)
    .replace(/^(?:a\s+)?report\s+on\s+/i, '')
    .replace(/\s+(?:on|from)\s+\d{1,2}(?:st|nd|rd|th)?\b.*$/i, '')
    .replace(/[.:\s]+$/g, '')
    .slice(0, 150)
    .trim()
}

const deliveryModeFromText = (text: string): EventSeed['deliveryMode'] => {
  if (/\bhybrid\b/i.test(text)) return 'hybrid'
  if (/\b(?:online|webinar|virtual|zoom|google meet)\b/i.test(text)) return 'online'
  return 'in-person'
}

const venueFromText = (text: string): string | undefined => {
  const explicitPatterns = [
    /\b(Seminar Hall(?:\s+(?:#?\d+[A-Za-z]?))?)/i,
    /\b(Lab\s*#?\s*\d+[A-Za-z]?)/i,
    /\b(Yashobhoomi(?:\s*\([^)]*\))?)/i,
    /\b(MSIT campus)\b/i,
    /\bvia\s+(Zoom|Google Meet)\b/i,
    /\bheld at\s+([^,.]+(?:,\s*[^,.]+)?)/i,
  ]

  for (const pattern of explicitPatterns) {
    const match = text.match(pattern)?.[1]
    if (match) return normalizeText(match)
  }

  return undefined
}

const slugsMatching = (
  text: string,
  patterns: Array<{ pattern: RegExp; slug: string }>,
): string[] => patterns.filter(({ pattern }) => pattern.test(text)).map(({ slug }) => slug)

const organisersFromText = (text: string): { name: string }[] => {
  const names = new Set(
    organiserPatterns.filter(({ pattern }) => pattern.test(text)).map(({ name }) => name),
  )
  const collaboration = text.match(
    /\bin collaboration with\s+(.{3,100}?)(?=,\s*(?:organised|organized|conducted|hosted)\b|\s+(?:on|from|at)\b|[.])/i,
  )?.[1]

  if (names.has('Training & Placement Cell')) names.delete('Placement Cell')

  if (collaboration && !societyPatterns.some(({ pattern }) => pattern.test(collaboration))) {
    names.add(normalizeText(collaboration).replace(/[;,]+$/g, ''))
  }

  return [...names].map((name) => ({ name }))
}

const assignSlugs = (seeds: Array<Omit<EventSeed, 'slug'>>): EventSeed[] => {
  const bases = seeds.map((seed) => slugify(seed.title) || `legacy-event-${seed.sourceOrder}`)
  const counts = new Map<string, number>()

  for (const base of bases) counts.set(base, (counts.get(base) || 0) + 1)

  return seeds.map((seed, index) => {
    const base = bases[index]
    if ((counts.get(base) || 0) === 1) return { ...seed, slug: base }

    const identity = `${seed.legacyReports[0]?.url || seed.summary}:${seed.sourceOrder}`
    return { ...seed, slug: `${base}-${shortHash(identity)}` }
  })
}

export const parseEventSeeds = (html: string): EventSeed[] => {
  const $ = load(html)
  const seeds: Array<Omit<EventSeed, 'slug'>> = []

  $('.centralcontent li#unique').each((index, element) => {
    const item = $(element)
    const content = item.clone()
    content.find('meta, script, style').remove()
    content.find('a').remove()
    const summary = normalizeText(content.text()).replace(/[.\s]+$/g, '')

    if (!summary) return

    const emphasized = item
      .find('strong, b')
      .toArray()
      .map((node) => $(node).text())
    const schedule = parseSchedule(summary)
    const legacyReports = new Map<string, string>()

    item.find('a[href]').each((_linkIndex, anchor) => {
      const href = ($(anchor).attr('href') || '').trim()
      if (!href || !isDocumentUrl(href)) return

      const url = absoluteLegacyUrl(href)
      if (!legacyReports.has(url)) {
        legacyReports.set(url, normalizeText($(anchor).text()) || 'Report')
      }
    })

    const registrationUrl = item
      .find('a[href]')
      .toArray()
      .map((anchor) => ({
        label: normalizeText($(anchor).text()),
        url: ($(anchor).attr('href') || '').trim(),
      }))
      .find(
        ({ label, url }) => url && !isDocumentUrl(url) && /register|registration/i.test(label),
      )?.url

    const legacyImages = new Set<string>()
    item.find('img[src]').each((_imageIndex, image) => {
      const src = ($(image).attr('src') || '').trim()
      if (src && !src.startsWith('data:')) legacyImages.add(absoluteLegacyUrl(src))
    })

    seeds.push({
      allDay: schedule.allDay,
      deliveryMode: deliveryModeFromText(summary),
      departmentSlugs: slugsMatching(summary, departmentPatterns),
      endsAt: schedule.endsAt,
      legacyImages: [...legacyImages].map((url) => ({ url })),
      legacyReports: [...legacyReports].map(([url, label]) => ({ label, url })),
      organisers: organisersFromText(summary),
      registrationUrl: registrationUrl ? absoluteLegacyUrl(registrationUrl) : undefined,
      reviewStatus: schedule.reviewStatus,
      societySlugs: slugsMatching(summary, societyPatterns),
      sourceOrder: (index + 1) * 10,
      startsAt: schedule.startsAt,
      summary,
      title: titleFromText(summary, emphasized, legacyReports.keys().next().value),
      venue: venueFromText(summary),
    })
  })

  return assignSlugs(seeds)
}

export const readEventSeeds = async (): Promise<EventSeed[]> => {
  const html = await readFile(path.join(process.cwd(), sourceSnapshotFile), 'utf8')
  return parseEventSeeds(html)
}

export const seedEvents = async (payload: Payload): Promise<void> => {
  const [seeds, departmentResult, societyResult, existingEventResult] = await Promise.all([
    readEventSeeds(),
    payload.find({
      collection: 'departments',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
    payload.find({
      collection: 'societies',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
    payload.find({
      collection: 'events',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
  ])

  if (!seeds.length) throw new Error('No event records could be parsed from events.html')

  const departmentIds = new Map(departmentResult.docs.map((item) => [item.slug, item.id]))
  const societyIds = new Map(societyResult.docs.map((item) => [item.slug, item.id]))
  const existingSlugs = new Set(existingEventResult.docs.map((event) => event.slug))
  let created = 0
  let skipped = 0

  for (const seed of seeds) {
    if (existingSlugs.has(seed.slug)) {
      skipped += 1
      continue
    }

    await payload.create({
      collection: 'events',
      data: {
        _status: 'draft',
        allDay: seed.allDay,
        deliveryMode: seed.deliveryMode,
        departments: seed.departmentSlugs.flatMap((slug) => {
          const id = departmentIds.get(slug)
          return id ? [id] : []
        }),
        endsAt: seed.endsAt,
        eventStatus: 'completed',
        legacyImages: seed.legacyImages,
        legacyReports: seed.legacyReports,
        organisers: seed.organisers,
        registrationUrl: seed.registrationUrl,
        reviewStatus: seed.reviewStatus,
        slug: seed.slug,
        societies: seed.societySlugs.flatMap((slug) => {
          const id = societyIds.get(slug)
          return id ? [id] : []
        }),
        sourceOrder: seed.sourceOrder,
        sourceSnapshotFile,
        sourceUrl,
        startsAt: seed.startsAt,
        summary: seed.summary,
        title: seed.title,
        venue: seed.venue,
      },
      draft: true,
      overrideAccess: true,
    })
    existingSlugs.add(seed.slug)
    created += 1
  }

  payload.logger.info(`Seeded ${created} event drafts; left ${skipped} existing events unchanged`)
}
