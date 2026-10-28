import { load } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

import type { Page } from '@/payload-types'

type PageBlock = NonNullable<Page['content']>[number]

type PageSource = {
  file: string
  legacyPath: string
  slug: string
  title: string
}

type PageSeed = PageSource & {
  content: PageBlock[]
  sourceSnapshotFile: string
  sourceUrl: string
}

const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')

// These are generic editorial pages. Content already owned by another collection is not duplicated here.
const sources: PageSource[] = [
  { file: 'about.html', legacyPath: '/about', slug: 'about', title: 'About MSIT' },
  {
    file: 'history.html',
    legacyPath: '/history',
    slug: 'about/history',
    title: 'History',
  },
  {
    file: 'visionmission.html',
    legacyPath: '/visionmission',
    slug: 'about/vision-and-mission',
    title: 'Vision and Mission',
  },
  {
    file: 'affiliation.html',
    legacyPath: '/affiliation',
    slug: 'about/affiliation',
    title: 'Affiliation',
  },
  { file: 'contact.html', legacyPath: '/contact', slug: 'contact', title: 'Contact Us' },
  {
    file: 'academic-calendar.html',
    legacyPath: '/academic-calendar',
    slug: 'academics/academic-calendar',
    title: 'Academic Calendar',
  },
  {
    file: 'aicte.html',
    legacyPath: '/aicte',
    slug: 'about/approvals/aicte',
    title: 'AICTE Approvals',
  },
  {
    file: 'brochure.html',
    legacyPath: '/brochure',
    slug: 'admissions/information-brochure',
    title: 'Information Brochure',
  },
  { file: 'careers.html', legacyPath: '/careers', slug: 'careers', title: 'Careers' },
  {
    file: 'grievances.html',
    legacyPath: '/grievances',
    slug: 'grievances',
    title: 'Grievances',
  },
  {
    file: 'internship-cell.html',
    legacyPath: '/internship-cell',
    slug: 'placements/internship-cell',
    title: 'Internship Cell',
  },
  {
    file: 'magazines.html',
    legacyPath: '/magazines',
    slug: 'publications/magazines',
    title: 'Magazines',
  },
  { file: 'nirf.html', legacyPath: '/nirf', slug: 'about/nirf', title: 'NIRF' },
  {
    file: 'online_fee.html',
    legacyPath: '/online_fee',
    slug: 'students/online-fee',
    title: 'Online Fee Payment',
  },
  {
    file: 'publications.html',
    legacyPath: '/publications',
    slug: 'research/publications',
    title: 'Publications',
  },
  { file: 'reports.html', legacyPath: '/reports', slug: 'about/reports', title: 'Reports' },
  { file: 'Research.html', legacyPath: '/Research', slug: 'research', title: 'Research' },
  { file: 'swayam.html', legacyPath: '/swayam', slug: 'academics/swayam', title: 'SWAYAM' },
  {
    file: 'syllabus.html',
    legacyPath: '/syllabus',
    slug: 'academics/syllabus',
    title: 'Syllabus',
  },
  {
    file: 'timetable.html',
    legacyPath: '/timetable',
    slug: 'academics/timetable',
    title: 'Timetable',
  },
]

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const absoluteLegacyUrl = (url: string): string => new URL(url, 'https://msit.in').href

const isUsableUrl = (url: string): boolean => {
  const normalized = url.toLowerCase()
  return (
    Boolean(url) &&
    url !== '#' &&
    !normalized.startsWith('javascript:') &&
    !normalized.startsWith('/cdn-cgi/l/email-protection')
  )
}

const isDocumentUrl = (url: string): boolean => {
  const pathname = new URL(url, 'https://msit.in').pathname
  return /\.(?:csv|docx?|pdf|pptx?|rtf|xlsx?)$/i.test(pathname)
}

const isImageUrl = (url: string): boolean => {
  const pathname = new URL(url, 'https://msit.in').pathname
  return /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(pathname)
}

const textNode = (text: string) => ({
  type: 'text',
  version: 1,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
})

const paragraphNode = (text: string) => ({
  type: 'paragraph',
  version: 1,
  children: [textNode(text)],
  direction: null,
  format: '',
  indent: 0,
})

const headingNode = (text: string, tag: 'h2' | 'h3') => ({
  type: 'heading',
  version: 1,
  children: [textNode(text)],
  direction: null,
  format: '',
  indent: 0,
  tag,
})

const readRichTextBlock = ($: ReturnType<typeof load>, title: string): PageBlock | undefined => {
  const centralContent = $('.centralcontent').first()
  const children: ReturnType<typeof paragraphNode | typeof headingNode>[] = []
  let activeTab = ''

  centralContent.find('h1, h2, h3, h4, h5, h6, p, li').each((_index, element) => {
    const item = $(element)

    if (
      item.closest('table, .nav-tabs').length > 0 ||
      (item.is('p') && item.closest('li').length > 0)
    ) {
      return
    }

    const tab = item.closest('.tab-pane')
    const tabId = tab.attr('id') || ''

    if (tabId && tabId !== activeTab) {
      const tabLabel = normalizeText(
        centralContent.find(`.nav-tabs a[href="#${tabId}"]`).first().text(),
      )
      if (tabLabel) children.push(headingNode(tabLabel, 'h2'))
      activeTab = tabId
    }

    const text = normalizeText(item.text())
    if (!text || text.toLowerCase() === title.toLowerCase()) return

    if (item.is('h1, h2, h3, h4, h5, h6')) {
      children.push(headingNode(text, item.is('h1, h2, h3') ? 'h2' : 'h3'))
      return
    }

    const onlyLinks = item.clone().find('a').remove().end().text()
    if (!normalizeText(onlyLinks) && item.find('a').length > 0) return

    children.push(paragraphNode(item.is('li') ? `• ${text}` : text))
  })

  if (children.length === 0) return undefined

  return {
    blockType: 'rich-text',
    body: {
      root: {
        type: 'root',
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  }
}

const readDocumentBlock = ($: ReturnType<typeof load>): PageBlock | undefined => {
  const documents = new Map<string, string>()

  $('.centralcontent a[href]').each((_index, element) => {
    if ($(element).closest('.nav-tabs').length > 0) return

    const href = ($(element).attr('href') || '').trim()
    if (!isUsableUrl(href) || !isDocumentUrl(href)) return

    const url = absoluteLegacyUrl(href)
    if (!documents.has(url)) documents.set(url, normalizeText($(element).text()) || url)
  })

  if (documents.size === 0) return undefined

  return {
    blockType: 'document-list',
    heading: 'Documents',
    legacyDocuments: [...documents].map(([url, label]) => ({ label, url })),
  }
}

const readLinkBlock = ($: ReturnType<typeof load>): PageBlock | undefined => {
  const links = new Map<string, { label: string; openInNewTab: boolean }>()

  $('.centralcontent a[href]').each((_index, element) => {
    if ($(element).closest('.nav-tabs').length > 0) return

    const href = ($(element).attr('href') || '').trim()
    if (
      !isUsableUrl(href) ||
      isDocumentUrl(href) ||
      isImageUrl(href) ||
      href.startsWith('mailto:')
    ) {
      return
    }

    const url = new URL(href, 'https://msit.in')
    const isInternal = url.hostname.replace(/^www\./, '') === 'msit.in'
    const destination = isInternal ? `${url.pathname}${url.search}${url.hash}` : url.href
    if (!links.has(destination)) {
      links.set(destination, {
        label: normalizeText($(element).text()) || destination,
        openInNewTab: $(element).attr('target') === '_blank' || !isInternal,
      })
    }
  })

  if (links.size === 0) return undefined

  return {
    blockType: 'link-list',
    heading: 'Related links',
    links: [...links].map(([destination, link]) => {
      if (destination.startsWith('/')) {
        return {
          destinationType: 'internal-path' as const,
          internalPath: destination,
          label: link.label,
          openInNewTab: link.openInNewTab,
        }
      }

      return {
        destinationType: 'external-url' as const,
        externalUrl: destination,
        label: link.label,
        openInNewTab: link.openInNewTab,
      }
    }),
  }
}

const readMediaBlocks = ($: ReturnType<typeof load>): PageBlock[] => {
  const images = new Map<string, string>()

  $('.centralcontent img[src]').each((_index, element) => {
    const source = ($(element).attr('src') || '').trim()
    if (!source || source.endsWith('/static/img/new.gif')) return

    const url = absoluteLegacyUrl(source)
    if (!images.has(url)) images.set(url, normalizeText($(element).attr('alt') || ''))
  })

  return [...images].map(([legacyImageUrl, caption]) => ({
    blockType: 'media',
    caption: caption || undefined,
    legacyImageUrl,
  }))
}

const readTableBlocks = ($: ReturnType<typeof load>): PageBlock[] =>
  $('.centralcontent table')
    .toArray()
    .flatMap((table) => {
      const rows = $(table)
        .find('tr')
        .toArray()
        .map((row) =>
          $(row)
            .children('th, td')
            .toArray()
            .map((cell) => normalizeText($(cell).text())),
        )
        .filter((row) => row.some(Boolean))

      if (rows.length === 0) return []

      const columnCount = Math.max(...rows.map((row) => row.length))
      const headings = rows[0].map((heading, index) => heading || `Column ${index + 1}`)
      while (headings.length < columnCount) headings.push(`Column ${headings.length + 1}`)

      const caption = normalizeText($(table).find('caption').first().text())
      return [
        {
          blockType: 'table' as const,
          caption: caption || undefined,
          columns: headings.map((heading) => ({ heading })),
          rows: rows.slice(1).map((row) => ({
            cells: Array.from({ length: columnCount }, (_value, index) => ({
              value: row[index] || '',
            })),
          })),
        },
      ]
    })

const readEmbedBlocks = ($: ReturnType<typeof load>): PageBlock[] =>
  $('.centralcontent iframe[src]')
    .toArray()
    .flatMap<PageBlock>((iframe) => {
      const source = ($(iframe).attr('src') || '').trim()
      if (!source) return []

      const url = absoluteLegacyUrl(source)
      if (/google\.[^/]+\/maps/i.test(url)) {
        return [{ blockType: 'embed', provider: 'google-maps', title: 'MSIT location map', url }]
      }
      if (/youtube(?:\.com|\.be)/i.test(url)) {
        return [{ blockType: 'embed', provider: 'youtube', title: 'Embedded video', url }]
      }

      return []
    })

const readPageSeed = async (source: PageSource): Promise<PageSeed> => {
  const html = await readFile(path.join(pagesDirectory, source.file), 'utf8')
  const $ = load(html)
  const blocks: Array<PageBlock | undefined> = [
    readRichTextBlock($, source.title),
    readDocumentBlock($),
    readLinkBlock($),
    ...readMediaBlocks($),
    ...readTableBlocks($),
    ...readEmbedBlocks($),
  ]

  return {
    ...source,
    content: blocks.filter((block): block is PageBlock => Boolean(block)),
    sourceSnapshotFile: `docs/references/snapshot/pages/${source.file}`,
    sourceUrl: absoluteLegacyUrl(source.legacyPath),
  }
}

export const readPageSeeds = async (): Promise<PageSeed[]> => Promise.all(sources.map(readPageSeed))

export const seedPages = async (payload: Payload): Promise<void> => {
  const [pages, existingPageResult] = await Promise.all([
    readPageSeeds(),
    payload.find({
      collection: 'pages',
      draft: true,
      limit: 1000,
      overrideAccess: true,
    }),
  ])
  const existingSlugs = new Set(existingPageResult.docs.map((page) => page.slug))
  let createdPages = 0
  let skippedPages = 0

  for (const page of pages) {
    if (existingSlugs.has(page.slug)) {
      skippedPages += 1
      continue
    }

    await payload.create({
      collection: 'pages',
      data: {
        _status: 'draft',
        content: page.content,
        legacyPath: page.legacyPath,
        reviewStatus: 'unreviewed',
        slug: page.slug,
        sourceSnapshotFile: page.sourceSnapshotFile,
        sourceUrl: page.sourceUrl,
        title: page.title,
      },
      draft: true,
      overrideAccess: true,
    })
    existingSlugs.add(page.slug)
    createdPages += 1
  }

  payload.logger.info(
    `Seeded ${createdPages} page drafts; left ${skippedPages} existing pages unchanged`,
  )
}
