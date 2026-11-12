import { load, type CheerioAPI } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

type NavigationLinkSeed = {
  destinationType: 'external-url' | 'internal-path'
  externalUrl?: string
  internalPath?: string
  label: string
  openInNewTab: boolean
}

type AnnouncementLinkSeed = {
  destinationType: NavigationLinkSeed['destinationType'] | 'none'
  externalUrl?: string
  internalPath?: string
  openInNewTab: boolean
}

type SiteSettingsSeed = {
  address?: string
  affiliationSummary?: string
  announcements: Array<AnnouncementLinkSeed & { message: string }>
  contactLines: { href?: string; label: string; value: string }[]
  footerLinks: NavigationLinkSeed[]
  footerText?: string
  instituteName: string
  legacyLogoUrl?: string
  navigationGroups: { label: string; links: NavigationLinkSeed[] }[]
  primaryLinks: NavigationLinkSeed[]
  sourceSnapshotFile: string
  sourceUrl: string
  utilityLinks: NavigationLinkSeed[]
}

const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')

const normalizeText = (value: string): string =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const absoluteLegacyUrl = (url: string): string => new URL(url, 'https://msit.in').href

export const canonicalRedirects = [
  ['/academic-calendar', '/academics/academic-calendar'],
  ['/administration', '/people/administration'],
  ['/advisory', '/committees/grievance-redressal'],
  ['/aicte', '/about/approvals/aicte'],
  ['/antiragging', '/committees/anti-ragging-committee'],
  ['/ap', '/departments/applied-sciences'],
  ['/affiliation', '/about/affiliation'],
  ['/attendance', '/students/attendance'],
  ['/brochure', '/admissions/information-brochure'],
  ['/cse', '/departments/cse'],
  ['/disaster', '/committees/disaster-management-committee'],
  ['/discipline', '/committees/discipline-committee'],
  ['/ece', '/departments/ece'],
  ['/eee', '/departments/eee'],
  ['/history', '/about/history'],
  ['/fromdesk', '/people/leadership'],
  ['/govern', '/people/governance'],
  ['/internship-cell', '/placements/internship-cell'],
  ['/iqac', '/committees/iqac-cell'],
  ['/it', '/departments/it'],
  ['/latest_news', '/news'],
  ['/magazines', '/publications/magazines'],
  ['/nirf', '/about/nirf'],
  ['/online_fee', '/students/online-fee'],
  ['/po', '/academics/programme-outcomes'],
  ['/posh', '/committees/internal-complaint-committee'],
  ['/publications', '/research/publications'],
  ['/reports', '/about/reports'],
  ['/Research', '/research'],
  ['/scstcell', '/committees/sc-st-cell'],
  ['/society', '/societies'],
  ['/swayam', '/academics/swayam'],
  ['/syllabus', '/academics/syllabus'],
  ['/timetable', '/academics/timetable'],
  ['/visionmission', '/about/vision-and-mission'],
] as const

const canonicalPaths = new Map<string, string>(canonicalRedirects)

export const findCanonicalPath = (path: string): string => canonicalPaths.get(path) || path

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

const readLines = ($: CheerioAPI, selector: string): string[] => {
  const html = $(selector).first().html() || ''
  const withLineBreaks = html.replace(/<br\s*\/?\s*>/gi, '\n')
  return load(`<div>${withLineBreaks}</div>`)('div')
    .text()
    .split('\n')
    .map(normalizeText)
    .filter(Boolean)
}

const toNavigationLink = (label: string, url: string): NavigationLinkSeed | undefined => {
  const cleanUrl = url.trim()
  const base = {
    label: normalizeText(label),
    openInNewTab: false,
  }

  if (!base.label || !cleanUrl || cleanUrl === '#') return undefined

  if (cleanUrl.startsWith('/media/')) {
    return {
      ...base,
      destinationType: 'external-url',
      externalUrl: absoluteLegacyUrl(cleanUrl),
    }
  }

  if (cleanUrl.startsWith('/')) {
    return {
      ...base,
      destinationType: 'internal-path',
      internalPath: findCanonicalPath(cleanUrl),
    }
  }

  return { ...base, destinationType: 'external-url', externalUrl: cleanUrl }
}

const toAnnouncementLink = (url: string): AnnouncementLinkSeed => {
  const cleanUrl = url.trim()
  const base = { openInNewTab: false }

  if (!cleanUrl || cleanUrl === '#') return { ...base, destinationType: 'none' }
  if (cleanUrl.startsWith('/')) {
    return {
      ...base,
      destinationType: 'internal-path',
      internalPath: findCanonicalPath(cleanUrl),
    }
  }

  return { ...base, destinationType: 'external-url', externalUrl: cleanUrl }
}

const readLinks = ($: CheerioAPI, selector: string): NavigationLinkSeed[] =>
  $(selector)
    .toArray()
    .map((anchor) =>
      toNavigationLink(normalizeText($(anchor).text()), ($(anchor).attr('href') || '').trim()),
    )
    .filter((link): link is NavigationLinkSeed => Boolean(link))

const readAddress = ($: CheerioAPI): string | undefined => {
  const paragraph = $('.centralcontent p')
    .filter((_index, element) =>
      /^Address$/i.test(normalizeText($(element).find('strong').first().text())),
    )
    .first()
    .clone()

  paragraph.find('strong').remove()
  return normalizeText(paragraph.text()) || undefined
}

const readEmail = ($: CheerioAPI): string | undefined => {
  const encoded = $('.centralcontent [data-cfemail]').first().attr('data-cfemail')
  return encoded ? decodeCloudflareEmail(encoded) : undefined
}

export const readSiteSettingsSeed = async (): Promise<SiteSettingsSeed> => {
  const [indexHtml, contactHtml] = await Promise.all([
    readFile(path.join(pagesDirectory, 'index.html'), 'utf8'),
    readFile(path.join(pagesDirectory, 'contact.html'), 'utf8'),
  ])
  const $ = load(indexHtml)
  const contactPage = load(contactHtml)
  const headerParagraphs = $('.navbar .container p')
  const contactLines = readLines($, '.navbar .container p:nth-of-type(2)').map((line) => {
    const separator = line.indexOf(':')
    const label = separator >= 0 ? normalizeText(line.slice(0, separator)) : 'Contact'
    const value = separator >= 0 ? normalizeText(line.slice(separator + 1)) : line
    const phone = value.replace(/[^+\d]/g, '')

    return {
      href: phone ? `tel:${phone}` : undefined,
      label,
      value,
    }
  })
  const email = readEmail(contactPage)

  if (email) {
    contactLines.push({ href: `mailto:${email}`, label: 'Email', value: email })
  }

  const navigationGroups = $('#deskview .panel-body > p')
    .toArray()
    .map((heading) => ({
      label: normalizeText($(heading).text()),
      links: $(heading)
        .next('ul')
        .find('a[href]')
        .toArray()
        .map((anchor) =>
          toNavigationLink(normalizeText($(anchor).text()), ($(anchor).attr('href') || '').trim()),
        )
        .filter((link): link is NavigationLinkSeed => Boolean(link)),
    }))
    .filter((group) => Boolean(group.label) && group.links.length > 0)
  const footerText = normalizeText($('.footer-info .text-muted').first().text())
    .replace(/\|\s*\d{4}\s*$/, '')
    .trim()

  return {
    address: readAddress(contactPage),
    affiliationSummary: normalizeText(headerParagraphs.first().text()) || undefined,
    announcements: $('.marquee-text a[href]')
      .toArray()
      .map((anchor) => ({
        ...toAnnouncementLink(($(anchor).attr('href') || '').trim()),
        message: normalizeText($(anchor).text()),
      }))
      .filter((announcement) => Boolean(announcement.message)),
    contactLines,
    footerLinks: [],
    footerText: footerText || undefined,
    instituteName: normalizeText($('.navbar .container h3').first().text()),
    legacyLogoUrl: (() => {
      const source = $('.navbar .container img').first().attr('src')
      return source ? absoluteLegacyUrl(source) : undefined
    })(),
    navigationGroups,
    primaryLinks: readLinks($, '#blacknavlist > li > a[href]'),
    sourceSnapshotFile: 'docs/references/snapshot/pages/index.html',
    sourceUrl: 'https://msit.in/',
    utilityLinks: readLinks($, '#bs-example-navbar-collapse-1 > ul > li > a[href]'),
  }
}

export const seedSiteSettings = async (payload: Payload): Promise<void> => {
  const existing = await payload.findGlobal({
    slug: 'site-settings',
    draft: true,
    overrideAccess: true,
  })

  if (existing.instituteName || existing.sourceSnapshotFile) {
    payload.logger.info('Site settings already contain content; leaving them unchanged')
    return
  }

  const settings = await readSiteSettingsSeed()
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      ...settings,
      _status: 'draft',
      reviewStatus: 'unreviewed',
    },
    draft: true,
    overrideAccess: true,
  })

  payload.logger.info('Seeded draft site settings and navigation')
}
