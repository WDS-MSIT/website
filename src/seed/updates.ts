import { createHash } from 'crypto'
import { load } from 'cheerio'
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

type SourceLink = {
  label: string
  url: string
}

type UpdateType = 'achievement' | 'news' | 'notice'

type UpdateSeed = {
  body?: RichText
  externalLink?: string
  legacyAttachments: SourceLink[]
  slug: string
  sourceOrder: number
  sourceSnapshotFile: string
  sourceUrl: string
  title: string
  type: UpdateType
}

type Source = {
  file: string
  heading: RegExp
  sourceUrl: string
  type: Exclude<UpdateType, 'achievement'>
}

const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')

const sources: Source[] = [
  {
    file: 'notices.html',
    heading: /^Notices\s*&\s*Circulars$/i,
    sourceUrl: 'https://msit.in/notices',
    type: 'notice',
  },
  {
    file: 'latest_news.html',
    heading: /^Latest News$/i,
    sourceUrl: 'https://msit.in/latest_news',
    type: 'news',
  },
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

const shortHash = (value: string): string =>
  createHash('sha256').update(value).digest('hex').slice(0, 8)

const isLegacyAttachment = (url: string): boolean =>
  url.startsWith('/media/') || /^https?:\/\/(?:www\.)?msit\.in\/media\//i.test(url)

const absoluteLegacyUrl = (url: string): string => new URL(url, 'https://msit.in').href

const usableLinks = (
  $: ReturnType<typeof load>,
  element: Parameters<ReturnType<typeof load>>[0],
): SourceLink[] =>
  $(element)
    .find('a[href]')
    .toArray()
    .map((anchor) => ({
      label: normalizeText($(anchor).text()),
      url: ($(anchor).attr('href') || '').trim(),
    }))
    .filter(({ url }) => Boolean(url) && url !== '#' && !url.toLowerCase().startsWith('javascript:'))

const pickExternalLink = (links: SourceLink[]): string | undefined => {
  const external = links.find(({ url }) => !isLegacyAttachment(url))
  return external ? absoluteLegacyUrl(external.url) : undefined
}

const toRichText = (text: string): RichText => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        direction: null,
        format: '',
        indent: 0,
        children: [
          { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text },
        ],
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const readListSeeds = async (source: Source): Promise<Omit<UpdateSeed, 'slug'>[]> => {
  const html = await readFile(path.join(pagesDirectory, source.file), 'utf8')
  const $ = load(html)
  const heading = $('h3')
    .filter((_index, element) => source.heading.test(normalizeText($(element).text())))
    .first()
  const seeds: Omit<UpdateSeed, 'slug'>[] = []

  heading
    .parent()
    .find('.tab-content > ul > li')
    .each((index, element) => {
      const links = usableLinks($, element)
      const firstLabel = links[0]?.label
      const fallback = $(element).clone()
      fallback.find('img').remove()
      const title = firstLabel || normalizeText(fallback.text())

      if (!title) return

      seeds.push({
        externalLink: pickExternalLink(links),
        legacyAttachments: links
          .filter(({ url }) => isLegacyAttachment(url))
          .map((link) => ({
            label: link.label || title,
            url: absoluteLegacyUrl(link.url),
          })),
        sourceOrder: (index + 1) * 10,
        sourceSnapshotFile: `docs/references/snapshot/pages/${source.file}`,
        sourceUrl: source.sourceUrl,
        title,
        type: source.type,
      })
    })

  return seeds
}

const readAchievementSeeds = async (): Promise<Omit<UpdateSeed, 'slug'>[]> => {
  const file = 'achievement-3.html'
  const sourceUrl = 'https://msit.in/achievement/3/'
  const html = await readFile(path.join(pagesDirectory, file), 'utf8')
  const $ = load(html)
  const heading = $('h3')
    .filter((_index, element) => /MOA and Grants Achievements/i.test($(element).text()))
    .first()
  const seeds: Omit<UpdateSeed, 'slug'>[] = []

  heading
    .parent()
    .find('.tab-pane p')
    .each((index, element) => {
      const links = usableLinks($, element)
      const content = $(element).clone()
      content.find('a').remove()
      const title = normalizeText(content.text()).replace(/[.\s]+$/, '')

      if (!title) return

      seeds.push({
        body: toRichText(title),
        externalLink: pickExternalLink(links),
        legacyAttachments: links
          .filter(({ url }) => isLegacyAttachment(url))
          .map((link) => ({
            label: link.label || title,
            url: absoluteLegacyUrl(link.url),
          })),
        sourceOrder: (index + 1) * 10,
        sourceSnapshotFile: `docs/references/snapshot/pages/${file}`,
        sourceUrl,
        title,
        type: 'achievement',
      })
    })

  return seeds
}

const assignSlugs = (seeds: Omit<UpdateSeed, 'slug'>[]): UpdateSeed[] => {
  const baseSlugs = seeds.map((seed) => slugify(seed.title) || `${seed.type}-update`)
  const baseCounts = new Map<string, number>()
  const typedCounts = new Map<string, number>()

  seeds.forEach((seed, index) => {
    const base = baseSlugs[index]
    baseCounts.set(base, (baseCounts.get(base) || 0) + 1)
    const typed = `${base}-${seed.type}`
    typedCounts.set(typed, (typedCounts.get(typed) || 0) + 1)
  })

  return seeds.map((seed, index) => {
    const base = baseSlugs[index]
    if ((baseCounts.get(base) || 0) === 1) return { ...seed, slug: base }

    const typed = `${base}-${seed.type}`
    if ((typedCounts.get(typed) || 0) === 1) return { ...seed, slug: typed }

    const identity =
      seed.legacyAttachments[0]?.url ||
      seed.externalLink ||
      `${seed.sourceSnapshotFile}:${seed.sourceOrder}`
    return { ...seed, slug: `${typed}-${shortHash(identity)}` }
  })
}

export const readUpdateSeeds = async (): Promise<UpdateSeed[]> => {
  const lists = await Promise.all(sources.map(readListSeeds))
  const achievements = await readAchievementSeeds()
  return assignSlugs([...lists.flat(), ...achievements])
}

export const seedUpdates = async (payload: Payload): Promise<void> => {
  const [updates, existingUpdateResult] = await Promise.all([
    readUpdateSeeds(),
    payload.find({
      collection: 'updates',
      draft: true,
      limit: 1000,
      overrideAccess: true,
    }),
  ])
  const existingUpdates = new Set(existingUpdateResult.docs.map((update) => update.slug))
  let createdUpdates = 0
  let skippedUpdates = 0

  for (const update of updates) {
    if (existingUpdates.has(update.slug)) {
      skippedUpdates += 1
      continue
    }

    await payload.create({
      collection: 'updates',
      data: {
        _status: 'draft',
        body: update.body,
        externalLink: update.externalLink,
        featured: false,
        legacyAttachments: update.legacyAttachments,
        reviewStatus: 'unreviewed',
        slug: update.slug,
        sourceOrder: update.sourceOrder,
        sourceSnapshotFile: update.sourceSnapshotFile,
        sourceUrl: update.sourceUrl,
        title: update.title,
        type: update.type,
      },
      draft: true,
      overrideAccess: true,
    })
    existingUpdates.add(update.slug)
    createdUpdates += 1
  }

  payload.logger.info(
    `Seeded ${createdUpdates} update drafts; left ${skippedUpdates} existing updates unchanged`,
  )
}
