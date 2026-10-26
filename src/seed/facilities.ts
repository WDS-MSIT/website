import { load } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'
import { parseLabContent } from './lab-content'

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

type FacilityDescription = { name: string; description?: RichText }
type FacilitySubject = { name: string; code?: string; classSemester?: string }
type FacilitySoftware = { name: string }

type FacilitySeed = {
  departmentSlug?: string
  description?: RichText
  lab?: {
    equipment?: RichText
    descriptions?: FacilityDescription[]
    subjects?: FacilitySubject[]
    software?: FacilitySoftware[]
  }
  gallery?: never
  legacyPath: string
  links?: { label: string; url: string }[]
  location?: string
  name: string
  slug: string
  sortOrder: number
  sourceImageUrls: string[]
  sourceSnapshotFile: string
  sourceUrl: string
  type:
    | 'laboratory'
    | 'library'
    | 'hostel'
    | 'staff-accommodation'
    | 'canteen'
    | 'sports'
    | 'medical'
    | 'bank'
}

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

type LoadInput = Parameters<ReturnType<typeof load>>[0]

const textFrom = ($: ReturnType<typeof load>, element: LoadInput): string => {
  const clone = $(element).clone()
  clone.find('br').replaceWith('\n')
  if (clone.is('tr')) {
    return clone
      .children('th, td')
      .toArray()
      .map((cell) => normalizeText($(cell).text()))
      .join(' | ')
  }
  return clone
    .text()
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim()
}

const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const toRichText = (blocks: string[]): RichText => ({
  root: {
    type: 'root',
    children: blocks.map((text) => ({
      type: 'paragraph',
      version: 1,
      direction: null,
      format: '',
      indent: 0,
      children: [
        { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text },
      ],
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

type Selection = ReturnType<ReturnType<typeof load>>

const blocksFrom = ($: ReturnType<typeof load>, root: Selection): string[] => {
  const blocks: string[] = []
  root.find('h3, h4, h5, p, li').each((_index, element) => {
    const text = textFrom($, element)
    if (text && !blocks.includes(text)) blocks.push(text)
  })
  return blocks
}

const sourcePath = path.resolve(process.cwd(), 'docs/references/snapshot/pages')
const sourceSnapshotFile = 'facilities.html'

const labDepartment = (heading: string): string | undefined => {
  const value = heading.toLowerCase()
  if (value.includes('computer science')) return 'cse'
  if (value.includes('information technology')) return 'it'
  if (value.includes('electronics and communication')) return 'ece'
  if (value.includes('electrical and electronics')) return 'eee'
  if (value.includes('applied sciences')) return 'applied-sciences'
  return undefined
}

const labHeading = (value: string): boolean => {
  const firstLine = value.split('\n')[0]
  return (
    firstLine.length < 500 &&
    /lab/i.test(firstLine) &&
    !/lab\s*view$/i.test(firstLine) &&
    /(?:lab[-#\s(]*\d|\(\d+\)|^[ivx]+\.\s*lab\b)/i.test(firstLine)
  )
}

const readLabSeeds = ($: ReturnType<typeof load>): FacilitySeed[] => {
  const seeds: FacilitySeed[] = []
  let sortOrder = 10

  $('.panel-collapse .panel-body').each((_panelIndex, panel) => {
    const body = $(panel)
    const panelHeading = normalizeText(
      body.closest('.panel-collapse').prev('.panel-heading').text(),
    )
    const departmentSlug = labDepartment(panelHeading)
    if (!departmentSlug) return

    const allBlocks = body
      .find('h3, h4, h5, p, li, tr')
      .toArray()
      .filter((element) => {
        const node = $(element)
        return !(node.is('p') && node.closest('li, tr').length > 0)
      })
    const mouIndex = allBlocks.findIndex((element) =>
      /mous?\s+department\s+of\s+it/i.test(textFrom($, element)),
    )
    const blocks = mouIndex >= 0 ? allBlocks.slice(0, mouIndex) : allBlocks
    const headings = blocks.filter((element) => {
      const value = normalizeText($(element).text())
      return (
        (labHeading(value) || /^lab-224\b/i.test(value.split('\n')[0])) &&
        ($(element).is('h3, h4, h5') || $(element).find('strong, b, u').length > 0)
      )
    })

    headings.forEach((heading, headingIndex) => {
      const start = blocks.indexOf(heading)
      const end =
        headingIndex + 1 < headings.length
          ? blocks.indexOf(headings[headingIndex + 1])
          : blocks.length
      let sectionBlocks = blocks
        .slice(start, end)
        .map((element) => textFrom($, element))
        .filter(Boolean)
      let name = sectionBlocks[0]?.split('\n')[0]
      const continuation = sectionBlocks[1]?.split('\n')[0]
      if (name && continuation && /(?:&|\/)\s*$/.test(name)) {
        name = `${name} ${continuation}`
        sectionBlocks = [
          sectionBlocks[0],
          sectionBlocks[1].split('\n').slice(1).join('\n'),
          ...sectionBlocks.slice(2),
        ]
      }
      if (!name) return
      const content = parseLabContent(sectionBlocks)
      const imageUrls = blocks
        .slice(start, end)
        .flatMap((element) => $(element).find('img').toArray())
        .map((image) => $(image).attr('src'))
        .filter((url): url is string => Boolean(url))
      const locationMatch = name.match(
        /lab\s*(?:\(\s*)?(?:#|-)?\s*(\d+(?:\s*[A-Za-z])?(?:-[A-Za-z])?)/i,
      )
      seeds.push({
        departmentSlug,
        description: content.description,
        lab: content.lab,
        legacyPath: '/facilities',
        location: locationMatch?.[1]
          ? `Lab ${locationMatch[1].replace(/\s+/g, ' ').trim()}`
          : undefined,
        name,
        slug: slugify(`${departmentSlug}-${name}`),
        sortOrder,
        sourceImageUrls: imageUrls,
        sourceSnapshotFile: 'docs/references/snapshot/pages/facilities.html',
        sourceUrl: 'https://msit.in/facilities',
        type: 'laboratory',
      })
      sortOrder += 10
    })
  })

  return seeds
}

export const readFacilitySeeds = async (): Promise<FacilitySeed[]> => {
  const html = await readFile(path.join(sourcePath, sourceSnapshotFile), 'utf8')
  const $ = load(html)
  const seeds = readLabSeeds($)
  const appliedHtml = await readFile(path.join(sourcePath, 'ap.html'), 'utf8')
  const applied = load(appliedHtml)
  const appliedBlocks = applied('#labs').find('h3, h4, h5, p, li').toArray()
  const appliedHeadings = appliedBlocks.filter((element) => {
    const value = textFrom(applied, element)
    return (
      value.length < 100 &&
      /lab|work\s*shop/i.test(value) &&
      applied(element).find('strong, b').length > 0
    )
  })
  appliedHeadings.forEach((heading, headingIndex) => {
    const start = appliedBlocks.indexOf(heading)
    const end =
      headingIndex + 1 < appliedHeadings.length
        ? appliedBlocks.indexOf(appliedHeadings[headingIndex + 1])
        : appliedBlocks.length
    const sectionBlocks = appliedBlocks
      .slice(start, end)
      .map((element) => textFrom(applied, element))
      .filter(Boolean)
    const name = sectionBlocks[0]
    if (!name) return
    seeds.push({
      departmentSlug: 'applied-sciences',
      description: parseLabContent(sectionBlocks).description,
      lab: parseLabContent(sectionBlocks).lab,
      legacyPath: '/ap',
      name,
      slug: slugify(`applied-sciences-${name}`),
      sortOrder: seeds.length * 10 + 10,
      sourceImageUrls: appliedBlocks
        .slice(start, end)
        .flatMap((element) => applied(element).find('img').toArray())
        .map((image) => applied(image).attr('src'))
        .filter((url): url is string => Boolean(url)),
      sourceSnapshotFile: 'docs/references/snapshot/pages/ap.html',
      sourceUrl: 'https://msit.in/ap',
      type: 'laboratory',
    })
  })
  const addCampus = (
    name: string,
    type: FacilitySeed['type'],
    selector: string,
    links?: { label: string; url: string }[],
  ) => {
    const panel = $(selector)
    let blocks = blocksFrom($, panel)
    if (selector === '#hostel') {
      const marker =
        name === 'Hostel'
          ? 'hostel:'
          : name === 'Staff Accommodation'
            ? 'staff accomodation:'
            : 'canteen:'
      blocks = panel
        .find('p')
        .toArray()
        .map((element) => textFrom($, element))
        .filter((text) => text.toLowerCase().startsWith(marker))
    }
    if (selector === '#sports' && name === 'Bank') {
      const sports = blocks.find((block) => block.includes('Bank:'))
      blocks = sports ? [sports.slice(sports.indexOf('Bank:'))] : []
    }
    if (selector === '#sports' && name === 'Sports') {
      blocks = blocks.map((block) => block.split('Bank:')[0].trim()).filter(Boolean)
    }
    if (selector === '#medical') {
      blocks = panel
        .find('div')
        .toArray()
        .map((element) => textFrom($, element))
        .filter(Boolean)
    }
    if (!blocks.length) return
    seeds.push({
      description: toRichText(blocks),
      legacyPath: '/facilities',
      links,
      name,
      slug: slugify(name),
      sortOrder: seeds.length * 10 + 10,
      sourceImageUrls: panel
        .find('img')
        .toArray()
        .map((image) => $(image).attr('src'))
        .filter((url): url is string => Boolean(url)),
      sourceSnapshotFile: 'docs/references/snapshot/pages/facilities.html',
      sourceUrl: 'https://msit.in/facilities',
      type,
    })
  }
  addCampus('Central Library', 'library', '#library', [
    {
      label: 'Library website',
      url: 'https://sites.google.com/site/centrallibrarymaharajasurajmal/',
    },
  ])
  addCampus('Hostel', 'hostel', '#hostel')
  addCampus('Staff Accommodation', 'staff-accommodation', '#hostel')
  addCampus('Canteen', 'canteen', '#hostel')
  addCampus('Sports', 'sports', '#sports')
  addCampus('Medical', 'medical', '#medical')
  addCampus('Bank', 'bank', '#sports')
  return seeds
}

export const seedFacilities = async (payload: Payload): Promise<void> => {
  const departmentIds = new Map<string, number>()
  for (const slug of ['cse', 'it', 'ece', 'eee', 'applied-sciences']) {
    const result = await payload.find({
      collection: 'departments',
      limit: 1,
      draft: true,
      overrideAccess: true,
      where: { slug: { equals: slug } },
    })
    if (result.docs[0]?.id) departmentIds.set(slug, result.docs[0].id)
  }
  const seeds = await readFacilitySeeds()
  let created = 0
  let skipped = 0
  for (const facility of seeds) {
    const existing = await payload.find({
      collection: 'facilities',
      limit: 1,
      draft: true,
      overrideAccess: true,
      where: { slug: { equals: facility.slug } },
    })
    if (existing.docs[0]) {
      skipped += 1
      continue
    }
    if (facility.departmentSlug && !departmentIds.has(facility.departmentSlug)) {
      throw new Error(`Department ${facility.departmentSlug} must be seeded before facilities`)
    }
    if (facility.sourceImageUrls.length)
      payload.logger.warn(`Facility ${facility.name} has source images that were not uploaded`)
    await payload.create({
      collection: 'facilities',
      data: {
        _status: 'draft',
        department: facility.departmentSlug
          ? departmentIds.get(facility.departmentSlug)
          : undefined,
        description: facility.description,
        lab: facility.lab,
        legacyPath: facility.legacyPath,
        links: facility.links,
        location: facility.location,
        name: facility.name,
        slug: facility.slug,
        sortOrder: facility.sortOrder,
        sourceSnapshotFile: facility.sourceSnapshotFile,
        sourceUrl: facility.sourceUrl,
        type: facility.type,
      },
      draft: true,
      overrideAccess: true,
    })
    created += 1
  }
  payload.logger.info(
    `Seeded ${created} facility drafts; left ${skipped} existing records unchanged`,
  )
}
