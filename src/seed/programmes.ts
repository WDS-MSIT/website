import { load, type CheerioAPI } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

type RichTextNode = {
  type: string
  version: number
  children?: RichTextNode[]
  text?: string
  direction?: 'ltr' | null
  format?: string | number
  indent?: number
  detail?: number
  mode?: string
  style?: string
}

type RichText = {
  root: {
    type: 'root'
    children: RichTextNode[]
    direction: 'ltr'
    format: ''
    indent: 0
    version: 1
  }
}

type Outcome = {
  code: string
  statement: string
  title?: string
}

type ResourceType =
  | 'assignments'
  | 'lesson-plan'
  | 'notes'
  | 'other'
  | 'outcome-mapping'
  | 'programme-outcomes'
  | 'question-bank'
  | 'question-papers'
  | 'scheme'
  | 'syllabus'

type LegacyResource = {
  label: string
  type: ResourceType
  url: string
}

type ProgrammeMeta = {
  code: string
  departmentSlug: string
  file: string
  intakePattern: RegExp
  legacyPath: string
  name: string
  shortName: string
  slug: string
}

type ProgrammeSeed = ProgrammeMeta & {
  accredited: boolean
  description?: RichText
  educationalObjectives: Outcome[]
  intake?: number
  legacyResources: LegacyResource[]
  programmeOutcomes: Outcome[]
  programmeSpecificOutcomes: Outcome[]
}

const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')
const aboutSnapshotFile = 'docs/references/snapshot/pages/about.html'
const outcomesSnapshotFile = 'docs/references/snapshot/pages/po.html'

const programmes: ProgrammeMeta[] = [
  {
    code: 'CSE',
    departmentSlug: 'cse',
    file: 'cse.html',
    intakePattern: /computer science/i,
    legacyPath: '/cse',
    name: 'B.Tech. Computer Science and Engineering',
    shortName: 'B.Tech. CSE',
    slug: 'btech-cse',
  },
  {
    code: 'IT',
    departmentSlug: 'it',
    file: 'it.html',
    intakePattern: /information technology/i,
    legacyPath: '/it',
    name: 'B.Tech. Information Technology',
    shortName: 'B.Tech. IT',
    slug: 'btech-it',
  },
  {
    code: 'ECE',
    departmentSlug: 'ece',
    file: 'ece.html',
    intakePattern: /electronics\s*(?:&|and)\s*communication/i,
    legacyPath: '/ece',
    name: 'B.Tech. Electronics and Communication Engineering',
    shortName: 'B.Tech. ECE',
    slug: 'btech-ece',
  },
  {
    code: 'EEE',
    departmentSlug: 'eee',
    file: 'eee.html',
    intakePattern: /electrical\s*(?:&|and)\s*electronics/i,
    legacyPath: '/eee',
    name: 'B.Tech. Electrical and Electronics Engineering',
    shortName: 'B.Tech. EEE',
    slug: 'btech-eee',
  },
]

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const absoluteLegacyUrl = (value: string): string => new URL(value, 'https://msit.in').href

const toRichText = (paragraphs: string[]): RichText => ({
  root: {
    type: 'root',
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      version: 1,
      direction: null,
      format: '',
      indent: 0,
      children: [
        {
          type: 'text',
          version: 1,
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text,
        },
      ],
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const resourceType = (label: string): ResourceType => {
  if (/programme? outcomes?|program outcomes?/i.test(label)) return 'programme-outcomes'
  if (/co\s*[-–—]\s*po\s*[-–—]\s*pso|mapping/i.test(label)) return 'outcome-mapping'
  if (/lesson plan/i.test(label)) return 'lesson-plan'
  if (/assignment/i.test(label)) return 'assignments'
  if (/question papers?/i.test(label)) return 'question-papers'
  if (/question bank/i.test(label)) return 'question-bank'
  if (/syllabus/i.test(label)) return 'syllabus'
  if (/scheme/i.test(label)) return 'scheme'
  if (/notes?/i.test(label)) return 'notes'
  return 'other'
}

const parseIntakes = (html: string): Map<string, number> => {
  const $ = load(html)
  const intakes = new Map<string, number>()

  $('.centralcontent table tr').each((_index, row) => {
    const cells = $(row)
      .children('th, td')
      .toArray()
      .map((cell) => normalizeText($(cell).text()))

    if (cells.length < 2) return

    for (const programme of programmes) {
      if (!programme.intakePattern.test(cells[0])) continue
      const seats = Number.parseInt(cells[1].replace(/\D/g, ''), 10)
      if (Number.isFinite(seats)) intakes.set(programme.slug, seats)
    }
  })

  return intakes
}

const parseCommonOutcomeResource = (html: string): LegacyResource | undefined => {
  const $ = load(html)
  const anchor = $('.centralcontent a[href]').first()
  const href = (anchor.attr('href') || '').trim()
  if (!href) return undefined

  return {
    label: normalizeText(anchor.text()) || 'Programme Outcomes',
    type: 'programme-outcomes',
    url: absoluteLegacyUrl(href),
  }
}

const parseLegacyResources = ($: CheerioAPI): LegacyResource[] => {
  const resources = new Map<string, LegacyResource>()

  $('#course-material a[href]').each((_index, anchor) => {
    const node = $(anchor)
    const href = (node.attr('href') || '').trim()
    if (!href) return

    const parent = node.closest('p, li')
    const strongLabel = normalizeText(parent.find('strong, b').first().text())
    const anchorLabel = normalizeText(node.text())
    const label = (strongLabel || anchorLabel || 'Programme resource')
      .replace(/^[•\s]+|[:\s]+$/g, '')
      .trim()
    const url = absoluteLegacyUrl(href)

    resources.set(url, { label, type: resourceType(label), url })
  })

  return [...resources.values()]
}

const splitTitledStatement = (value: string): { statement: string; title?: string } => {
  const separator = value.indexOf(':')
  if (separator < 1 || separator > 100) return { statement: value }

  const title = normalizeText(value.slice(0, separator))
  const statement = normalizeText(value.slice(separator + 1))
  if (!statement) return { statement: value }

  return { statement, title }
}

const parseProgrammeContent = (
  $: CheerioAPI,
): {
  description?: RichText
  educationalObjectives: Outcome[]
  programmeOutcomes: Outcome[]
  programmeSpecificOutcomes: Outcome[]
} => {
  const pane = $('#program-description').first()
  const description: string[] = []
  const educationalObjectives: Outcome[] = []
  const programmeOutcomes: Outcome[] = []
  const programmeSpecificOutcomes: Outcome[] = []
  let section: 'description' | 'other' | 'peo' | 'po' | 'pso' = 'description'

  pane.find('p, li').each((_index, element) => {
    const node = $(element)
    if (node.is('p') && node.closest('li').length > 0) return

    const text = normalizeText(node.text())
    if (!text) return

    if (/^VISION$/i.test(text)) {
      section = 'other'
      return
    }
    if (/^MISSION$/i.test(text)) {
      section = 'other'
      return
    }
    if (/PROGRAM(?:ME)? EDUCATIONAL OBJECTIVES?/i.test(text)) {
      section = 'peo'
      return
    }
    if (/PROGRAM(?:ME)? SPECIFIC OUTCOMES?/i.test(text)) {
      section = 'pso'
      return
    }
    if (/PROGRAM(?:ME)? OUTCOMES?/i.test(text)) {
      section = 'po'
      return
    }

    if (section === 'description') {
      description.push(text)
      return
    }

    const peo = text.match(/^PEO\s*-?\s*(\d+)\s*[.:]?\s*(.+)$/i)
    if (peo) {
      educationalObjectives.push({ code: `PEO${peo[1]}`, statement: normalizeText(peo[2]) })
      return
    }

    const pso = text.match(/^PSO\s*-?\s*(\d+)\s*[.:]?\s*(.+)$/i)
    if (pso) {
      programmeSpecificOutcomes.push({
        code: `PSO${pso[1]}`,
        statement: normalizeText(pso[2]),
      })
      return
    }

    const po = text.match(/^PO\s*-?\s*(\d+)\s*[.:]?\s*(.+)$/i)
    if (po) {
      const content = splitTitledStatement(normalizeText(po[2]))
      programmeOutcomes.push({ code: `PO${po[1]}`, ...content })
      return
    }

    if (node.is('li') && section === 'po') {
      const content = splitTitledStatement(text)
      programmeOutcomes.push({
        code: `PO${programmeOutcomes.length + 1}`,
        ...content,
      })
      return
    }

    if (node.is('li') && section === 'pso') {
      programmeSpecificOutcomes.push({
        code: `PSO${programmeSpecificOutcomes.length + 1}`,
        statement: text,
      })
    }
  })

  return {
    description: description.length ? toRichText(description) : undefined,
    educationalObjectives,
    programmeOutcomes,
    programmeSpecificOutcomes,
  }
}

export const readProgrammeSeeds = async (): Promise<ProgrammeSeed[]> => {
  const [aboutHtml, outcomesHtml, ...departmentHtml] = await Promise.all([
    readFile(path.join(process.cwd(), aboutSnapshotFile), 'utf8'),
    readFile(path.join(process.cwd(), outcomesSnapshotFile), 'utf8'),
    ...programmes.map((programme) => readFile(path.join(pagesDirectory, programme.file), 'utf8')),
  ])
  const intakes = parseIntakes(aboutHtml)
  const commonResource = parseCommonOutcomeResource(outcomesHtml)

  return programmes.map((programme, index) => {
    const $ = load(departmentHtml[index])
    const content = parseProgrammeContent($)
    const resources = parseLegacyResources($)

    if (commonResource && !resources.some((resource) => resource.url === commonResource.url)) {
      resources.unshift(commonResource)
    }

    return {
      ...programme,
      ...content,
      accredited: /NBA Accredited/i.test($('.centralcontent h3').first().text()),
      intake: intakes.get(programme.slug),
      legacyResources: resources,
    }
  })
}

export const seedProgrammes = async (payload: Payload): Promise<void> => {
  const [seeds, departmentResult, existingProgrammeResult] = await Promise.all([
    readProgrammeSeeds(),
    payload.find({
      collection: 'departments',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
    payload.find({
      collection: 'programmes',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
  ])
  const departmentIds = new Map(departmentResult.docs.map((item) => [item.slug, item.id]))
  const existingSlugs = new Set(existingProgrammeResult.docs.map((item) => item.slug))
  let created = 0
  let skipped = 0

  for (const seed of seeds) {
    if (existingSlugs.has(seed.slug)) {
      skipped += 1
      continue
    }

    const department = departmentIds.get(seed.departmentSlug)
    if (!department) throw new Error(`Department ${seed.departmentSlug} must be seeded first`)

    await payload.create({
      collection: 'programmes',
      data: {
        _status: 'draft',
        accreditations: seed.accredited
          ? [
              {
                accreditingBody: 'National Board of Accreditation (NBA)',
                accreditationStatus: 'claimed',
                note: 'The legacy department page labels this programme as NBA Accredited but does not provide a validity period.',
              },
            ]
          : [],
        code: seed.code,
        degree: 'Bachelor of Technology (B.Tech.)',
        department,
        description: seed.description,
        educationalObjectives: seed.educationalObjectives,
        intakes: seed.intake
          ? [
              {
                seats: seed.intake,
                shift: 'combined',
                sourceNote:
                  'Current intake shown on the legacy About MSIT page; academic year not stated.',
              },
            ]
          : [],
        legacyPath: seed.legacyPath,
        legacyResources: seed.legacyResources,
        level: 'undergraduate',
        name: seed.name,
        programmeOutcomes: seed.programmeOutcomes,
        programmeSpecificOutcomes: seed.programmeSpecificOutcomes,
        reviewStatus: 'unreviewed',
        shortName: seed.shortName,
        slug: seed.slug,
        sourceReferences: [
          {
            label: 'Department programme description',
            snapshotFile: `docs/references/snapshot/pages/${seed.file}`,
            url: absoluteLegacyUrl(seed.legacyPath),
          },
          {
            label: 'Institute intake table',
            snapshotFile: aboutSnapshotFile,
            url: 'https://msit.in/about',
          },
          {
            label: 'Institute programme outcomes document',
            snapshotFile: outcomesSnapshotFile,
            url: 'https://msit.in/po',
          },
        ],
        sourceSnapshotFile: `docs/references/snapshot/pages/${seed.file}`,
        sourceUrl: absoluteLegacyUrl(seed.legacyPath),
      },
      draft: true,
      overrideAccess: true,
    })
    existingSlugs.add(seed.slug)
    created += 1
  }

  payload.logger.info(
    `Seeded ${created} programme drafts; left ${skipped} existing programmes unchanged`,
  )
}
