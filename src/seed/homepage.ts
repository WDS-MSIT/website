import { load } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

import { findCanonicalPath } from '@/seed/site-settings'

type HomepageSeed = {
  campusTour: {
    gallery: { legacyImageUrl: string }[]
    heading?: string
    videoUrl?: string
  }
  heading: string
  heroSlides: {
    caption: string
    destinationType: 'none'
    legacyImageUrl: string
    openInNewTab: false
  }[]
  sourceSnapshotFile: string
  sourceUrl: string
  updateSections: {
    heading: string
    itemLimit: number
    selectionMode: 'latest'
    updateType: 'achievement' | 'news' | 'notice'
    viewAllPath?: string
  }[]
}

const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const absoluteLegacyUrl = (url: string): string => new URL(url, 'https://msit.in').href

const updateTypeForHeading = (heading: string): 'achievement' | 'news' | 'notice' | undefined => {
  if (/news/i.test(heading)) return 'news'
  if (/notice/i.test(heading)) return 'notice'
  if (/achievement/i.test(heading)) return 'achievement'
  return undefined
}

export const readHomepageSeed = async (): Promise<HomepageSeed> => {
  const html = await readFile(path.join(pagesDirectory, 'index.html'), 'utf8')
  const $ = load(html)
  const centralContent = $('.centralcontent').first()
  const updateSections: HomepageSeed['updateSections'] = []

  $('.container > .row > .col-md-2:last-child .panel').each((_index, panel) => {
    const heading = normalizeText($(panel).find('.panel-heading').first().text())
    const updateType = updateTypeForHeading(heading)

    if (!heading || !updateType) return

    const itemCount = $(panel).find('.als-item, .panel-body > ul > li').length
    const viewAllPath = $(panel).find('#viewall a[href]').first().attr('href')
    updateSections.push({
      heading,
      itemLimit: itemCount || 5,
      selectionMode: 'latest',
      updateType,
      viewAllPath: viewAllPath ? findCanonicalPath(viewAllPath) : undefined,
    })
  })

  return {
    campusTour: {
      gallery: $('#galleryCarousel .carousel-inner .item img[src]')
        .toArray()
        .map((image) => ({
          legacyImageUrl: absoluteLegacyUrl($(image).attr('src') || ''),
        })),
      heading: normalizeText(
        centralContent
          .find('h4')
          .filter((_index, heading) => /Virtual Tour/i.test($(heading).text()))
          .first()
          .text(),
      ),
      videoUrl: centralContent.find('iframe[src]').first().attr('src') || undefined,
    },
    heading: normalizeText(centralContent.children('h4').first().text()),
    heroSlides: $('#centralcarousel .carousel-inner > .item')
      .toArray()
      .map((slide) => {
        const imageUrl = $(slide).find('img[src]').first().attr('src')
        const caption = normalizeText($(slide).find('.carousel-caption').text())
        if (!imageUrl || !caption) return undefined

        return {
          caption,
          destinationType: 'none' as const,
          legacyImageUrl: absoluteLegacyUrl(imageUrl),
          openInNewTab: false as const,
        }
      })
      .filter((slide): slide is NonNullable<typeof slide> => Boolean(slide)),
    sourceSnapshotFile: 'docs/references/snapshot/pages/index.html',
    sourceUrl: 'https://msit.in/',
    updateSections,
  }
}

export const seedHomepage = async (payload: Payload): Promise<void> => {
  const existing = await payload.findGlobal({
    slug: 'homepage',
    draft: true,
    overrideAccess: true,
  })

  if (existing.heading || existing.sourceSnapshotFile) {
    payload.logger.info('Homepage already contains content; leaving it unchanged')
    return
  }

  const homepage = await readHomepageSeed()
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      ...homepage,
      _status: 'draft',
      reviewStatus: 'unreviewed',
    },
    draft: true,
    overrideAccess: true,
  })

  payload.logger.info('Seeded draft homepage')
}
