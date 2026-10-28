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

type LinkType = 'website' | 'social' | 'document' | 'form' | 'other'
type ExternalLinkType = 'website' | 'social' | 'form' | 'other'

export type SocietyLinkSeed = {
  label: string
  url: string
  type: LinkType
}

export type SocietyExternalLinkSeed = {
  label: string
  url: string
  type: ExternalLinkType
}

export type FacultyCoordinatorSeed = {
  name: string
  role?: string
  designation?: string
  department?: string
  email?: string
}

export type StudentLeaderSeed = {
  name: string
  role?: string
  unit?: string
  department?: string
  email?: string
  phone?: string
}

export type SocietySeed = {
  name: string
  slug: string
  category: 'unclassified'
  overview?: string
  description: RichText
  foundedOn?: string
  foundedYear?: number
  facultyCoordinators: FacultyCoordinatorSeed[]
  studentLeaders: StudentLeaderSeed[]
  contactEmails: string[]
  externalLinks: SocietyExternalLinkSeed[]
  legacyDocuments: { label: string; url: string }[]
  legacyImages: { url: string }[]
  sortOrder: number
  sourceUrl: string
  sourceSnapshotFile: string
  legacyPath: string
}

export type SocietyParseResult = {
  seeds: SocietySeed[]
  issues: string[]
}

type Selection = ReturnType<ReturnType<typeof load>>

const sourceSnapshotFile = 'docs/references/snapshot/pages/society.html'
const sourceUrl = 'https://msit.in/society'
const legacyPath = '/society'

const names: Record<string, string> = {
  nss: 'NSS',
  cerebrate: 'Cerebrate',
  ieee: 'IEEE',
  nisp: 'NISP',
  'e-yantra': 'E-Yantra',
  techsoc: 'TechSoc',
  mutants: 'Mutants',
  veda: 'Veda',
  prakriti: 'Prakriti',
  'geek-room': 'Geek Room',
  'broadcast-society': 'Broadcast Society',
  mlsa: 'MLSA',
  iste: 'ISTE',
  gdsc: 'GDSC',
  'u-knighted': 'U-Knighted',
  'ndli-club': 'NDLI Club',
  spark: 'SPARK',
}

const founding: Record<string, { on?: string; year?: number }> = {
  nss: { on: '2019-09-19' },
  cerebrate: { year: 2016 },
  ieee: { year: 2009 },
  prakriti: { on: '2010-03-03' },
}

const decodeEntities = (value: string): string => {
  const decoded = value
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(x?)([0-9a-f]+);/gi, (_match, hex: string, code: string) => {
      const point = Number.parseInt(code, hex ? 16 : 10)
      return Number.isFinite(point) ? String.fromCodePoint(point) : _match
    })

  return decoded
}

const normalizeText = (value: string): string =>
  decodeEntities(value)
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

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

const uniqueEmails = (emails: string[]): string[] => {
  const seen = new Set<string>()
  const result: string[] = []

  for (const email of emails) {
    const key = email.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    result.push(email)
  }

  return result
}

const platformLabels: Record<string, string> = {
  'chess.com': 'Chess.com',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  'x.com': 'X',
  youtube: 'YouTube',
}

const platformFromFilename = (value: string): string | undefined => {
  const platform = value.match(
    /instagram|linkedin|facebook|youtube|twitter|x\.com|chess\.com/i,
  )?.[0]
  return platform ? platformLabels[platform.toLowerCase()] : undefined
}

const platformFromUrl = (value: string): string | undefined => {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./i, '')
    return platformFromFilename(hostname)
  } catch {
    return undefined
  }
}

const socialLabels = new Set(['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Twitter', 'X'])

const classifyLink = (value: string, label?: string): LinkType => {
  const url = value.toLowerCase()

  if (
    /\.pdf(?:$|[?#])/.test(url) ||
    url.includes('drive.google.com/file') ||
    url.includes('docs.google.com/document')
  ) {
    return 'document'
  }

  if (url.includes('docs.google.com/forms') || url.includes('forms.gle')) {
    return 'form'
  }

  if (label && socialLabels.has(label)) {
    return 'social'
  }

  if (/(^|\.)(instagram|facebook|linkedin|youtube|twitter|x)\.com/.test(url)) {
    return 'social'
  }

  return 'website'
}

const stripHonorific = (value: string): string =>
  normalizeText(value)
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .replace(/^(?:(?:Prof|Dr|Mr|Ms|Mrs)\.?\s*|\(Dr\.?\)\s*)+/i, '')
    .replace(/[;,.\s]+$/, '')
    .trim()

export const normalizePersonName = (value: string): string =>
  stripHonorific(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const decodeEmailsIn = ($: CheerioAPI, root: Selection): void => {
  root.find('[data-cfemail]').each((_index, element) => {
    const decoded = decodeCloudflareEmail($(element).attr('data-cfemail') || '')
    if (decoded) $(element).text(decoded)
  })
}

const lineBreakMarker = '@@SOCIETY_LINE_BREAK@@'

type LoadInput = Parameters<ReturnType<typeof load>>[0]

const elementText = ($: CheerioAPI, element: LoadInput): string => {
  const clone = $(element).clone()
  decodeEmailsIn($, clone)
  clone.find('img').remove()
  clone.find('br').replaceWith(lineBreakMarker)

  return clone
    .text()
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t\r\n]+/g, ' ')
    .split(lineBreakMarker)
    .map((line) => normalizeText(line))
    .join('\n')
    .trim()
}

const startsTextBlock = (line: string): boolean => /^(?:[-–—•]|[^:]{1,80}:\s)/.test(line)

const textBlocks = (value: string): string[] => {
  const blocks: string[] = []
  let current: string[] = []

  const flush = (): void => {
    if (!current.length) return
    blocks.push(current.join(' '))
    current = []
  }

  for (const rawLine of value.split('\n')) {
    const line = normalizeText(rawLine)

    if (!line) {
      flush()
      continue
    }

    if (startsTextBlock(line) && current.length) flush()
    current.push(line)
  }

  flush()
  return blocks
}

const readLines = ($: CheerioAPI, pane: Selection): string[] => {
  const clone = pane.clone()
  decodeEmailsIn($, clone)
  clone.find('table').remove()
  clone.find('br').replaceWith('\n')
  clone.find('p, li, h1, h2, h3, h4, h5, h6, div').each((_index, element) => {
    $(element).append('\n')
  })

  return clone
    .text()
    .replace(/\u00a0/g, ' ')
    .split('\n')
    .map((line) => normalizeText(line))
    .filter(Boolean)
}

const descriptionParagraphs = ($: CheerioAPI, pane: Selection, name: string): string[] => {
  const clone = pane.clone()
  clone.find('.societyhead').remove()
  decodeEmailsIn($, clone)
  clone.find('img').remove()

  const blocks: string[] = []

  clone.find('p, li, tr').each((_index, element) => {
    const node = $(element)

    if (node.is('p') && node.find('p').length > 0) return
    if (node.is('li') && node.closest('p').length > 0) return

    if (node.is('tr')) {
      const cells = node
        .find('td, th')
        .toArray()
        .map((cell) => elementText($, cell).replace(/\n+/g, ' '))
        .filter(Boolean)
      const row = cells.join(' | ')
      if (row && !blocks.includes(row)) blocks.push(row)
      return
    }

    for (const text of textBlocks(elementText($, element))) {
      if (!blocks.includes(text)) blocks.push(text)
    }
  })

  const nameKey = normalizeText(name).toLowerCase()
  while (blocks.length && blocks[0].toLowerCase() === nameKey) {
    blocks.shift()
  }

  return blocks
}

const overviewBlockIsUseful = (text: string): boolean => {
  if (!text || text.length < 40) return false
  if (/\[email\s*protected\]/i.test(text)) return false
  if (/\.(pdf|docx?|pptx?|xlsx?)\b/i.test(text)) return false
  if (!/[.!?](?:\s|$)/.test(text)) return false
  if (/^[^:]{1,90}:\s/.test(text) && text.length < 160) return false

  return true
}

const buildOverview = (paragraphs: string[]): string | undefined => {
  for (const paragraph of paragraphs) {
    const text = normalizeText(paragraph)
    if (overviewBlockIsUseful(text)) return text
  }

  return undefined
}

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

const allEmails = ($: CheerioAPI, pane: Selection): string[] => {
  const emails: string[] = []

  pane.find('[data-cfemail]').each((_index, element) => {
    const decoded = decodeCloudflareEmail($(element).attr('data-cfemail') || '')
    if (decoded) emails.push(decoded)
  })

  const clone = pane.clone()
  decodeEmailsIn($, clone)
  const text = clone.text().replace(/\u00a0/g, ' ')

  for (const match of text.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)) {
    emails.push(match[0])
  }

  return uniqueEmails(emails)
}

const sourceImages = ($: CheerioAPI, pane: Selection): string[] => {
  const urls = new Set<string>()

  pane.find('img').each((_index, element) => {
    const node = $(element)
    const src = (node.attr('src') || '').trim()

    if (!src || src.startsWith('data:')) return
    if (/fonts\.gstatic\.com\/s\/e\/notoemoji/i.test(src)) return

    const basename = src.split('/').pop() || ''
    if (
      /^(?:icon[-_])?(?:instagram|linkedin|facebook|youtube|twitter)\.(?:png|jpe?g|svg|webp)$/i.test(
        basename,
      )
    ) {
      return
    }

    urls.add(src.startsWith('/') ? `https://msit.in${src}` : src)
  })

  return [...urls]
}

const labelFromContext = (value: string): string | undefined => {
  const text = normalizeText(value)
  const platform = platformFromFilename(text)

  if (platform) return platform

  if (/website/i.test(text)) return 'Website'
  if (/connect with us/i.test(text)) return 'Connect with us'

  const colonTail = text.split(':').pop()?.trim() || ''
  if (colonTail && colonTail.length <= 50 && colonTail.split(/\s+/).length <= 6) {
    return colonTail.replace(/[:\-–—(]\s*$/, '').trim() || undefined
  }

  const tail =
    text
      .split(/[.!?]\s/)
      .pop()
      ?.trim() || ''
  if (tail && tail.length <= 40 && tail.split(/\s+/).length <= 5) {
    return tail.replace(/[:\-–—(]\s*$/, '').trim() || undefined
  }

  return undefined
}

const parseLinks = ($: CheerioAPI, pane: Selection): SocietyLinkSeed[] => {
  const links: SocietyLinkSeed[] = []
  const seen = new Set<string>()

  const add = (label: string, url: string, type: LinkType): void => {
    const normalizedUrl = url.trim()
    const normalizedLabel = normalizeText(label)

    if (!normalizedLabel || !/^https?:\/\//i.test(normalizedUrl)) return
    if (seen.has(normalizedUrl)) return

    seen.add(normalizedUrl)
    links.push({ label: normalizedLabel, url: normalizedUrl, type })
  }

  pane.find('a[href]').each((_index, element) => {
    const node = $(element)
    let href = (node.attr('href') || '').trim()

    if (
      !href ||
      href.startsWith('/cdn-cgi/') ||
      href.startsWith('mailto:') ||
      href.startsWith('#')
    ) {
      return
    }

    if (href.startsWith('/')) href = `https://msit.in${href}`
    if (!/^https?:\/\//i.test(href)) return
    if (/\.(jpe?g|png|gif|webp|svg)(?:$|[?#])/i.test(href)) return

    const platform = platformFromUrl(href)
    let label = normalizeText(node.text())

    if (!label) {
      const image = node.find('img').first()
      const alt = normalizeText(image.attr('alt') || '')
      const src = image.attr('src') || ''
      const basename =
        src
          .split('/')
          .pop()
          ?.replace(/\.[a-z0-9]+$/i, '') || ''

      label =
        alt.replace(/^IEEE MSIT\s+/i, '').trim() ||
        platformFromFilename(basename) ||
        platformFromFilename(src) ||
        ''
    }

    if (platform) {
      label = platform
    } else if (/^https?:\/\//i.test(label)) {
      const context = normalizeText(
        node
          .parent()
          .text()
          .split(/https?:\/\//i)[0],
      )
      label = labelFromContext(context) || new URL(href).hostname
    }

    if (!label) return

    add(label, href, classifyLink(href, label))
  })

  const clone = pane.clone()
  decodeEmailsIn($, clone)
  const text = clone.text().replace(/\u00a0/g, ' ')

  for (const match of text.matchAll(/https?:\/\/[^\s<>"']+/gi)) {
    const url = match[0].replace(/[),.;]+$/g, '')

    if (seen.has(url)) continue
    if (/\.(jpe?g|png|gif|webp|svg)(?:$|[?#])/i.test(url)) continue

    const before = text.slice(Math.max(0, (match.index || 0) - 60), match.index || 0)
    const label = platformFromUrl(url) || labelFromContext(before) || new URL(url).hostname

    add(label, url, classifyLink(url, label))
  }

  return links.filter((link) => {
    try {
      const url = new URL(link.url)
      const host = url.hostname.replace(/^www\./i, '')
      const isBareHost = url.pathname === '/' && !url.search && !url.hash

      if (!isBareHost) return true

      return !links.some((other) => {
        if (other === link) return false

        try {
          const otherUrl = new URL(other.url)
          return otherUrl.hostname.replace(/^www\./i, '') === host && otherUrl.pathname !== '/'
        } catch {
          return false
        }
      })
    } catch {
      return true
    }
  })
}

const splitLinks = (
  links: SocietyLinkSeed[],
): {
  externalLinks: SocietyExternalLinkSeed[]
  legacyDocuments: { label: string; url: string }[]
} => {
  const externalLinks: SocietyExternalLinkSeed[] = []
  const legacyDocuments: { label: string; url: string }[] = []

  for (const link of links) {
    if (link.type === 'document') {
      legacyDocuments.push({ label: link.label, url: link.url })
      continue
    }

    externalLinks.push({ label: link.label, type: link.type, url: link.url })
  }

  return { externalLinks, legacyDocuments }
}

const facultyRolePattern =
  /(convener|faculty coordinator|faculty advisor|teacher[-\s]?in[-\s]?charge|team leader|branch counselor|chapter advisor|faculty member|\bmember\b)/i

const studentRolePattern =
  /(student lead|student coordinator|student head|chairperson|vice chairperson|president|vice president|general secretary|secretary|treasurer|research head|grant officer|research coordinator|executive head|deputy head|workshop head|event head)/i

const isFacultyRole = (role: string): boolean =>
  facultyRolePattern.test(role) && !/faculty advisor for students/i.test(role)

const isStudentRole = (role: string): boolean =>
  studentRolePattern.test(role) && !/\bfaculty\b/i.test(role)

const normalizeRole = (role: string): string =>
  normalizeText(role)
    .replace(/\s*:\s*$/, '')
    .replace(/^Faculty Coordinators$/i, 'Faculty Coordinator')
    .replace(/^Student Coordinators$/i, 'Student Coordinator')
    .replace(/^Vice Chairpersons$/i, 'Vice Chairperson')
    .replace(/^Student Leads$/i, 'Student Lead')
    .replace(/^Student Heads$/i, 'Student Head')

const looksLikePersonText = (value: string): boolean => {
  const text = value.trim()

  if (text.length < 2 || text.length > 400) return false
  if (
    /^(to|for|follow|connect|email|e-mail|website|instagram|youtube|linkedin|about|our|the)\b/i.test(
      text,
    ) &&
    !/\(/.test(text)
  ) {
    return false
  }
  if (text.split(/\s+/).length > 14 && !/\(/.test(text)) return false

  return true
}

const departmentPattern =
  /^(CSE|IT|ECE|EEE|Applied Sciences|Computer Science(?: & Engineering)?|Information Technology|Electronics(?: and Communication)?(?: Engineering)?|Electrical(?: and Electronics)?(?: Engineering)?|Mathematics|Physics|Chemistry|Management|Humanities)\b/i

const designationPattern =
  /^(Professor|Associate Professor|Assistant Professor|Assoc\.?\s*Prof(?:essor)?\.?|Asst\.?\s*Prof(?:essor)?\.?|Librarian|Lecturer|Dean|Director|Principal)(?=\s|$|[|,])/i

const isDesignationLine = (value: string): boolean => {
  const text = normalizeText(value)
  return designationPattern.test(text) || /^(Associate|Assistant)?\s*Professor\s*\|/i.test(text)
}

type ParsedPerson = {
  name: string
  designation?: string
  department?: string
  email?: string
  phone?: string
  role?: string
}

type PersonDetails = {
  designation?: string
  department?: string
  phone?: string
  role?: string
}

const normalizeDepartment = (value: string | undefined): string | undefined => {
  if (!value) return undefined

  const department = normalizeText(value)
    .replace(/\.$/, '')
    .replace(/\s+Department$/i, '')
    .trim()

  return department || undefined
}

const normalizePersonPart = (value: string): string => normalizeText(value).replace(/[;,.\s]+$/, '')

const parsePersonDetails = (details: string[]): PersonDetails => {
  const values = details
    .flatMap((detail) => detail.split(/[|,]/))
    .map((detail) => normalizeText(detail))
    .filter(Boolean)

  const designation = values.find((value) => designationPattern.test(value))
  const department = normalizeDepartment(values.find((value) => departmentPattern.test(value)))
  const phone = details
    .join(' ')
    .match(/\d{5}[\s-]?\d{5}|\d{10,12}/)?.[0]
    ?.replace(/\D/g, '')
  const role = values.find((value) => /^(president|vice[-\s]?president)$/i.test(value))

  return { designation, department, phone, role }
}

const parsePerson = (chunk: string, sharedDepartment?: string): ParsedPerson | undefined => {
  let text = chunk.trim()
  if (!text) return undefined

  const emails = [...text.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map(
    (match) => match[0],
  )
  text = text.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, ' ')

  const details: string[] = []
  text = text
    .replace(/\(([^)]*)\)/g, (_match, inner: string) => {
      details.push(inner)
      return ' '
    })
    .replace(/\s+/g, ' ')
    .trim()

  const parts = text
    .split(',')
    .map((part) => normalizePersonPart(part))
    .filter(Boolean)

  let name = parts.shift() || ''
  details.push(...parts)
  name = stripHonorific(name)

  if (!name || name.length < 2) return undefined
  if (
    /^(associate|assistant|professor|librarian|student|faculty|department|email|phone)\b/i.test(
      name,
    )
  ) {
    return undefined
  }

  const parsed = parsePersonDetails(details)

  return {
    name,
    designation: parsed.designation,
    department: parsed.department || normalizeDepartment(sharedDepartment),
    email: emails[0],
    phone: parsed.phone,
    role: parsed.role,
  }
}

const departmentNames =
  'CSE|IT|ECE|EEE|Applied Sciences|Computer Science(?: & Engineering)?|Information Technology|Electronics(?: and Communication)?(?: Engineering)?|Electrical(?: and Electronics)?(?: Engineering)?'

const trailingDepartmentPattern = new RegExp(`^(?:${departmentNames})(?:\\s+Department)?\\.?$`, 'i')

const splitOutsideParens = (value: string, separator: RegExp): string[] => {
  const parts: string[] = []
  let depth = 0
  let start = 0

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index]

    if (character === '(') {
      depth += 1
      continue
    }

    if (character === ')') {
      depth = Math.max(0, depth - 1)
      continue
    }

    if (depth !== 0) continue

    const match = value.slice(index).match(separator)
    if (!match || match.index !== 0) continue

    parts.push(value.slice(start, index).trim())
    index += match[0].length - 1
    start = index + 1
  }

  parts.push(value.slice(start).trim())

  return parts.filter(Boolean)
}

const stripTrailingDepartment = (value: string): { text: string; department?: string } => {
  const parts = splitOutsideParens(value, /^,\s*/)
  if (parts.length < 2) return { text: value }

  const last = parts[parts.length - 1]
  if (!trailingDepartmentPattern.test(last)) return { text: value }

  return {
    text: parts.slice(0, -1).join(', '),
    department: normalizeDepartment(last),
  }
}

const startsNewPerson = (current: string, next: string): boolean => {
  if (!next) return false
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(next)) return false
  if (designationPattern.test(next) || departmentPattern.test(next)) return false
  if (/^(?:Prof|Dr|Mr|Ms|Mrs)\b/i.test(next)) return true

  return /\)$/.test(current) && /^\p{Lu}/u.test(next) && next.split(/\s+/).length >= 2
}

const mergeNameParts = (parts: string[]): string[] => {
  const groups: string[] = []

  for (const part of parts) {
    const current = groups[groups.length - 1]

    if (!current) {
      groups.push(part)
    } else if (startsNewPerson(current, part)) {
      groups.push(part)
    } else {
      groups[groups.length - 1] = `${current}, ${part}`
    }
  }

  return groups
}

const splitPersonChunks = (value: string): { chunks: string[]; sharedDepartment?: string } => {
  let text = value.trim().replace(/^[^\p{L}\p{N}]+/u, '')
  const stripped = stripTrailingDepartment(text)
  text = stripped.text.replace(/\)\s+(?=(?:Prof|Dr|Mr|Ms|Mrs)\b)/g, ') | ')

  const chunks = splitOutsideParens(text, /^(?:\s+and\s+|\s*&\s*|\s*\|\s*)/i).flatMap((group) =>
    mergeNameParts(splitOutsideParens(group, /^,\s*/)),
  )

  return {
    chunks: chunks.filter(Boolean),
    sharedDepartment: stripped.department,
  }
}

const parsePeopleFromText = (value: string): ParsedPerson[] => {
  if (!looksLikePersonText(value)) return []

  const { chunks, sharedDepartment } = splitPersonChunks(value)

  return chunks
    .map((chunk) => parsePerson(chunk, sharedDepartment))
    .filter((person): person is ParsedPerson => Boolean(person))
}

const parseDesignationLine = (value: string): { designation?: string; department?: string } => {
  const parsed = parsePersonDetails([value])
  return { designation: parsed.designation, department: parsed.department }
}

const sparkUnits = new Set([
  'Research Department',
  'PR and Outreach',
  'Workshop and Training/ Event and workshop management',
  'Publication and Documentation',
  'Technical Department',
  'Marketing Department',
])

const parseMutantsTable = ($: CheerioAPI, pane: Selection): StudentLeaderSeed[] => {
  const students: StudentLeaderSeed[] = []

  pane.find('table tr').each((_rowIndex, row) => {
    const cells = $(row)
      .find('td, th')
      .toArray()
      .map((cell) => elementText($, cell))

    if (cells.length < 2 || !cells[0] || !cells[1]) return
    if (/^(society|unit|name|student head)$/i.test(cells[0])) return

    const unit = cells[0]
    const names = cells[1]
      .split(',')
      .map((name) => stripHonorific(name))
      .filter(Boolean)
    const phones = (cells[2] || '')
      .split(',')
      .map((phone) => phone.replace(/\D/g, ''))
      .filter(Boolean)
    const emails = (cells[3] || '')
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean)

    names.forEach((name, index) => {
      students.push({
        name,
        role: 'Student Head',
        unit,
        phone: phones[index],
        email: emails[index],
      })
    })
  })

  return students
}

const parsePeople = (
  $: CheerioAPI,
  pane: Selection,
  slug: string,
): { faculty: FacultyCoordinatorSeed[]; students: StudentLeaderSeed[] } => {
  const lines = readLines($, pane)
  const faculty: FacultyCoordinatorSeed[] = []
  const students: StudentLeaderSeed[] = []
  let pending: { role: string; type: 'faculty' | 'student' } | null = null
  let currentUnit: string | undefined

  for (const line of lines) {
    if (slug === 'spark' && sparkUnits.has(line)) {
      currentUnit = line
      pending = null
      continue
    }

    const roleLine = line.match(/^(.{2,90}?)\s*:\s*(.*)$/)
    if (roleLine) {
      const role = normalizeRole(roleLine[1])
      const rest = roleLine[2].trim()

      pending = null

      if (isFacultyRole(role)) {
        if (rest) {
          for (const person of parsePeopleFromText(rest)) {
            faculty.push({
              name: person.name,
              role,
              designation: person.designation,
              department: person.department,
              email: person.email,
            })
          }
        } else {
          pending = { role, type: 'faculty' }
        }
        continue
      }

      if (isStudentRole(role)) {
        if (rest) {
          for (const person of parsePeopleFromText(rest)) {
            students.push({
              name: person.name,
              role: person.role || role,
              unit: currentUnit,
              department: person.department,
              email: person.email,
              phone: person.phone,
            })
          }
        } else {
          pending = { role, type: 'student' }
        }
        continue
      }

      pending = null
      continue
    }

    const inline = line.match(
      /^(Faculty Coordinators?|Faculty Advisors?|Student Coordinators?|Student Heads?|Student Leads?|Convener|Teacher[-\s]?in[-\s]?charge|Team Leader|Branch Counselor|Chapter Advisor)\s+(.+)$/i,
    )

    if (inline) {
      const role = normalizeRole(inline[1])
      const rest = inline[2].trim()

      if (isFacultyRole(role)) {
        for (const person of parsePeopleFromText(rest)) {
          faculty.push({
            name: person.name,
            role,
            designation: person.designation,
            department: person.department,
            email: person.email,
          })
        }
      } else if (isStudentRole(role)) {
        for (const person of parsePeopleFromText(rest)) {
          students.push({
            name: person.name,
            role: person.role || role,
            unit: currentUnit,
            department: person.department,
            email: person.email,
            phone: person.phone,
          })
        }
      }

      pending = null
      continue
    }

    const labelOnly = line.match(
      /^(Faculty Coordinators?|Faculty Advisors?|Student Coordinators?|Student Heads?|Student Leads?|Convener|Teacher[-\s]?in[-\s]?charge|Team Leader|Branch Counselor|Chapter Advisor)\s*:?\s*$/i,
    )

    if (labelOnly) {
      const role = normalizeRole(labelOnly[1])
      pending = { role, type: isFacultyRole(role) ? 'faculty' : 'student' }
      continue
    }

    if (!pending) continue

    if (pending.type === 'faculty') {
      if (isDesignationLine(line) && faculty.length) {
        const last = faculty[faculty.length - 1]
        const details = parseDesignationLine(line)

        if (!last.designation) last.designation = details.designation
        if (!last.department) last.department = details.department
        continue
      }

      const people = parsePeopleFromText(line)
      if (people.length) {
        for (const person of people) {
          faculty.push({
            name: person.name,
            role: pending.role,
            designation: person.designation,
            department: person.department,
            email: person.email,
          })
        }
        continue
      }

      pending = null
      continue
    }

    const people = parsePeopleFromText(line)
    if (people.length) {
      for (const person of people) {
        students.push({
          name: person.name,
          role: person.role || pending.role,
          unit: currentUnit,
          department: person.department,
          email: person.email,
          phone: person.phone,
        })
      }
      continue
    }

    pending = null
  }

  if (slug === 'mutants') {
    students.push(...parseMutantsTable($, pane))

    return {
      faculty: dedupeFaculty(faculty),
      students: dedupeMutants(students),
    }
  }

  return {
    faculty: dedupeFaculty(faculty),
    students: dedupeStudents(students),
  }
}

const dedupeFaculty = (faculty: FacultyCoordinatorSeed[]): FacultyCoordinatorSeed[] => {
  const seen = new Set<string>()

  return faculty.filter((person) => {
    const key = `${normalizePersonName(person.name)}|${person.role?.toLowerCase() || ''}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const dedupeStudents = (students: StudentLeaderSeed[]): StudentLeaderSeed[] => {
  const seen = new Set<string>()

  return students.filter((person) => {
    const key = [
      normalizePersonName(person.name),
      person.role?.toLowerCase() || '',
      person.unit?.toLowerCase() || '',
    ].join('|')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const dedupeMutants = (students: StudentLeaderSeed[]): StudentLeaderSeed[] => {
  const byName = new Map<string, StudentLeaderSeed>()

  for (const person of students) {
    const key = normalizePersonName(person.name)
    const existing = byName.get(key)

    // NOTE: The Mutants pane repeats its coordinator above the sub-society table.
    // Keep the table entry because it carries the sub-society unit.
    if (!existing || (!existing.unit && person.unit)) {
      byName.set(key, person)
    }
  }

  return [...byName.values()]
}

export const parseSocietySeeds = (html: string): SocietyParseResult => {
  const $ = load(html)
  const panes = $('.tab-pane').toArray()
  const seeds: SocietySeed[] = []
  const issues: string[] = []

  if (!panes.length) {
    return { seeds, issues: ['No .tab-pane elements found in society.html'] }
  }

  panes.forEach((paneElement, index) => {
    const pane = $(paneElement)
    const slug = (pane.attr('id') || '').trim()

    if (!slug) {
      issues.push(`Society tab ${index + 1} has no id`)
      return
    }

    const name = names[slug]

    if (!name) {
      issues.push(`Society tab "${slug}" is not configured; add it to the seed metadata`)
      return
    }

    const paragraphs = descriptionParagraphs($, pane, name)
    const people = parsePeople($, pane, slug)
    const emails = allEmails($, pane)
    const personEmails = new Set(
      [...people.faculty, ...people.students]
        .map((person) => person.email?.toLowerCase())
        .filter((email): email is string => Boolean(email)),
    )
    const contactEmails = emails.filter((email) => !personEmails.has(email.toLowerCase()))
    const founded = founding[slug] || {}
    const { externalLinks, legacyDocuments } = splitLinks(parseLinks($, pane))

    seeds.push({
      name,
      slug,
      category: 'unclassified',
      overview: buildOverview(paragraphs),
      description: toRichText(paragraphs),
      foundedOn: founded.on,
      foundedYear: founded.year,
      facultyCoordinators: people.faculty,
      studentLeaders: people.students,
      contactEmails,
      externalLinks,
      legacyDocuments,
      legacyImages: sourceImages($, pane).map((url) => ({ url })),
      sortOrder: (index + 1) * 10,
      sourceUrl: `${sourceUrl}#${slug}`,
      sourceSnapshotFile,
      legacyPath,
    })
  })

  return { seeds, issues }
}

export const readSocietySeeds = async (): Promise<SocietyParseResult> => {
  const html = await readFile(path.join(process.cwd(), sourceSnapshotFile), 'utf8')
  return parseSocietySeeds(html)
}

const findFacultyIds = async (payload: Payload): Promise<Map<string, number[]>> => {
  const result = await payload.find({
    collection: 'faculty',
    draft: true,
    limit: 0,
    overrideAccess: true,
    pagination: false,
  })
  const ids = new Map<string, number[]>()

  for (const doc of result.docs) {
    const key = normalizePersonName(doc.name)
    if (!key) continue

    const matches = ids.get(key) || []
    matches.push(doc.id)
    ids.set(key, matches)
  }

  return ids
}

export const seedSocieties = async (payload: Payload): Promise<void> => {
  const { seeds, issues } = await readSocietySeeds()

  for (const issue of issues) {
    payload.logger.warn(`Society seed: ${issue}`)
  }

  if (!seeds.length) {
    throw new Error('No society records could be parsed from society.html')
  }

  const facultyIds = await findFacultyIds(payload)
  const unresolved = new Set<string>()
  let created = 0
  let skipped = 0
  let failed = 0

  for (const seed of seeds) {
    const existing = await payload.find({
      collection: 'societies',
      draft: true,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: seed.slug } },
    })

    if (existing.docs[0]) {
      skipped += 1
      continue
    }

    try {
      const facultyCoordinators = seed.facultyCoordinators.map((person) => {
        const matches = facultyIds.get(normalizePersonName(person.name)) || []

        if (matches.length === 1) {
          return { ...person, faculty: matches[0] }
        }

        if (matches.length > 1) {
          unresolved.add(`${person.name} (multiple faculty matches)`)
        } else {
          unresolved.add(person.name)
        }

        return person
      })

      await payload.create({
        collection: 'societies',
        data: {
          _status: 'draft',
          category: seed.category,
          ...(seed.contactEmails.length
            ? { contact: { emails: seed.contactEmails.map((email) => ({ email })) } }
            : {}),
          description: seed.description,
          externalLinks: seed.externalLinks,
          facultyCoordinators,
          foundedOn: seed.foundedOn,
          foundedYear: seed.foundedYear,
          legacyPath: seed.legacyPath,
          legacyDocuments: seed.legacyDocuments,
          legacyImages: seed.legacyImages,
          name: seed.name,
          overview: seed.overview,
          reviewStatus: 'unreviewed',
          slug: seed.slug,
          sortOrder: seed.sortOrder,
          sourceSnapshotFile: seed.sourceSnapshotFile,
          sourceUrl: seed.sourceUrl,
          studentLeaders: seed.studentLeaders,
        },
        draft: true,
        overrideAccess: true,
      })
      created += 1
    } catch (error) {
      failed += 1
      payload.logger.error(
        `Failed to seed society ${seed.name}: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  payload.logger.info(
    `Seeded ${created} society drafts; left ${skipped} existing records unchanged`,
  )

  if (unresolved.size) {
    payload.logger.warn(
      `Faculty relationships left unset for: ${[...unresolved].sort().join(', ')}`,
    )
  }

  if (failed) {
    throw new Error(`${failed} society records failed to seed`)
  }
}
