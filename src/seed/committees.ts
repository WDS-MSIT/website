import { load, type CheerioAPI } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

type CommitteeMemberSeed = {
  committeeRole?: string
  designation?: string
  email?: string
  name: string
  phone?: string
}

type CommitteeSeed = {
  legacyPath: string
  links?: { label: string; url: string }[]
  members: CommitteeMemberSeed[]
  name: string
  slug: string
  sourceSnapshotFile: string
  sourceUrl: string
}

type Source = {
  file: string
  legacyPath: string
  key: string
}

const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')

const sources: Source[] = [
  { file: 'discipline.html', key: 'discipline', legacyPath: '/discipline' },
  { file: 'disaster.html', key: 'disaster-management', legacyPath: '/disaster' },
  { file: 'scstcell.html', key: 'sc-st-cell', legacyPath: '/scstcell' },
  { file: 'posh.html', key: 'internal-complaint', legacyPath: '/posh' },
  { file: 'advisory.html', key: 'grievance-redressal', legacyPath: '/advisory' },
  { file: 'antiragging.html', key: 'anti-ragging', legacyPath: '/antiragging' },
  { file: 'iqac.html', key: 'iqac', legacyPath: '/iqac' },
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

const cleanDesignation = (value: string): string | undefined => {
  const cleaned = normalizeText(value)
    .replace(/\[?email(?:\s*protected)?\]?/gi, '')
    .replace(/\(?\s*mob(?:ile)?\.?\s*(?:no\.?)?\s*\)?/gi, '')
    .replace(/\(\s*\d{10,12}\s*\)/g, '')
    .replace(/\d{10,12}/g, '')
    .replace(/\(\s*\)/g, '')
    .trim()
  return cleaned || undefined
}

const splitRole = (
  value: string,
): { committeeRole?: string; designation?: string; phone?: string } => {
  const phone = value.match(/\d{10,12}/)?.[0]
  const withoutPhone = normalizeText(value)
    .replace(/\(?\d{10,12}\)?/g, '')
    .trim()
  const roleMatch = withoutPhone.match(
    /^(Chairman\s+and\s+Convenor|Co-Convenor|Convenor|Convener|Chairperson|Member|Student\s+Representative)$/i,
  )

  if (roleMatch) return { committeeRole: roleMatch[1], phone }
  return { designation: cleanDesignation(withoutPhone), phone }
}

const parseTableMembers = (tableIndex: number, $: CheerioAPI): CommitteeMemberSeed[] => {
  const rows = $('.centralcontent table').eq(tableIndex).find('tr').toArray()
  const members: CommitteeMemberSeed[] = []
  const headers = rows[0]
    ? $(rows[0])
        .find('td, th')
        .toArray()
        .map((cell) => normalizeText($(cell).text()).toLowerCase())
    : []
  const indexOf = (pattern: RegExp, fallback: number): number => {
    const index = headers.findIndex((header) => pattern.test(header))
    return index >= 0 ? index : fallback
  }
  const nameIndex = indexOf(/person name|^name$|name of the faculty/, 1)
  const designationIndex = indexOf(/designation/, 2)
  const roleIndex = indexOf(/position|nominated as/, -1)
  const typeIndex = indexOf(/^type$/, -1)
  const mobileIndex = indexOf(/mobile|phone|contact/, -1)

  for (const row of rows.slice(1)) {
    const cells = $(row).find('td').toArray()
    if (cells.length < 3) continue
    const values = cells.map((cell) => normalizeText($(cell).text()))
    const name = values[nameIndex]
    if (!name || /^s\.?\s*no\.?$/i.test(name)) continue
    const member: CommitteeMemberSeed = { name }

    const designation = normalizeText($(cells[designationIndex]).text())
    const role = splitRole(designation)
    const type = typeIndex >= 0 ? values[typeIndex] : undefined
    member.designation = [type, role.designation].filter(Boolean).join(' / ') || undefined
    member.committeeRole = role.committeeRole
    member.phone ||= role.phone
    if (mobileIndex >= 0) member.phone ||= values[mobileIndex].match(/\d{10,12}/)?.[0]

    if (roleIndex >= 0 && cells[roleIndex]) {
      const roleText = normalizeText($(cells[roleIndex]).text())
      if (roleText) member.committeeRole = roleText
    }

    const emailNode = $(
      cells.map((cell) => $(cell).find('[data-cfemail]').toArray()).flat(),
    ).first()
    if (!member.email && emailNode.length) {
      member.email = decodeCloudflareEmail(emailNode.attr('data-cfemail') || '')
    }
    members.push(member)
  }

  return members
}

const parseSimpleParagraphMembers = (
  contentSelector: string,
  $: CheerioAPI,
): CommitteeMemberSeed[] => {
  const members: CommitteeMemberSeed[] = []
  $(contentSelector)
    .first()
    .find('p')
    .each((_index, paragraph) => {
      const text = normalizeText($(paragraph).text())
      if (!text || /^latest news|notices|achievements/i.test(text)) return
      const roleMatch = text.match(
        /^(.*?)(?:\s*\((Convener|Convenor|Member|Chairman|Chairperson)\))$/i,
      )
      if (!roleMatch) return
      members.push({ name: normalizeText(roleMatch[1]), committeeRole: roleMatch[2] })
    })
  return members
}

const parseIqacMembers = ($: CheerioAPI): CommitteeMemberSeed[] => {
  const members: CommitteeMemberSeed[] = []
  $('#committee p').each((_index, paragraph) => {
    const text = normalizeText($(paragraph).text()).replace(/^\d+\.\s*/, '')
    if (!text || /^IQAC Cell$/i.test(text)) return

    const firstComma = text.indexOf(',')
    if (firstComma < 0) {
      members.push({ name: text })
      return
    }

    const name = normalizeText(text.slice(0, firstComma))
    const rest = normalizeText(text.slice(firstComma + 1))
    const roleMatch = rest.match(/(Chairperson|Coordinator|Convener|Member)(?:\s*\([^)]*\))?/gi)
    const committeeRole = roleMatch?.map(normalizeText).join(', ')
    const designation = cleanDesignation(
      rest.replace(/,?\s*(Chairperson|Coordinator|Convener|Member)(?:\s*\([^)]*\))?/gi, ''),
    )
    members.push({ committeeRole, designation, name })
  })
  return members
}

const parseMainContentLinks = ($: CheerioAPI): { label: string; url: string }[] => {
  const links: { label: string; url: string }[] = []
  $('.centralcontent .tab-pane a[href]').each((_index, anchor) => {
    const url = $(anchor).attr('href')
    const label = normalizeText($(anchor).text())
    if (!url || url.startsWith('#') || !label) return
    links.push({ label, url })
  })
  return links
}

const readCommitteeSeeds = async (): Promise<CommitteeSeed[]> => {
  const seeds: CommitteeSeed[] = []

  for (const source of sources) {
    const html = await readFile(path.join(pagesDirectory, source.file), 'utf8')
    const $ = load(html)
    const sourceUrl = `https://msit.in${source.legacyPath}`
    const sourceSnapshotFile = `docs/references/snapshot/pages/${source.file}`

    if (source.key === 'discipline') {
      seeds.push({
        name: 'Discipline Committee',
        slug: 'discipline-committee',
        members: parseSimpleParagraphMembers('.centralcontent', $),
        legacyPath: source.legacyPath,
        sourceUrl,
        sourceSnapshotFile,
      })
      continue
    }

    if (source.key === 'sc-st-cell') {
      const content = $('.centralcontent').first()
      const members: CommitteeMemberSeed[] = []
      content.find('p').each((_index, paragraph) => {
        const text = normalizeText($(paragraph).text())
        const roleMatch = text.match(/(Chairman|Convener|Member)\s*$/i)
        if (!roleMatch) return
        members.push({
          name: normalizeText(text.slice(0, roleMatch.index)),
          committeeRole: roleMatch[1],
        })
      })
      seeds.push({
        name: 'SC & ST Cell',
        slug: 'sc-st-cell',
        members,
        legacyPath: source.legacyPath,
        sourceUrl,
        sourceSnapshotFile,
      })
      continue
    }

    if (source.key === 'iqac') {
      seeds.push({
        name: 'IQAC Cell',
        slug: 'iqac-cell',
        members: parseIqacMembers($),
        links: parseMainContentLinks($),
        legacyPath: source.legacyPath,
        sourceUrl,
        sourceSnapshotFile,
      })
      continue
    }

    if (source.key === 'anti-ragging') {
      $('p')
        .filter((_index, paragraph) => /Anti-Ragging (Committee|Squad)/i.test($(paragraph).text()))
        .each((_index, heading) => {
          const headingText = normalizeText($(heading).text()).replace(/^[A-Z]\.\s*/, '')
          const table = $(heading).nextAll('table').first()
          const tableIndex = $('.centralcontent table').index(table)
          seeds.push({
            name: headingText,
            slug: slugify(headingText),
            members: parseTableMembers(tableIndex, $),
            legacyPath: source.legacyPath,
            sourceUrl,
            sourceSnapshotFile,
          })
        })
      continue
    }

    if (source.key === 'grievance-redressal') {
      const tables = $('.centralcontent table').toArray()
      const names = [
        'Student Grievance Redressal Committee',
        'Faculty/Staff Grievance Redressal Committee',
      ]
      tables.slice(0, 2).forEach((table, index) => {
        const tableIndex = $('.centralcontent table').index($(table))
        seeds.push({
          name: names[index],
          slug: slugify(names[index]),
          members: parseTableMembers(tableIndex, $),
          legacyPath: source.legacyPath,
          sourceUrl,
          sourceSnapshotFile,
        })
      })
      continue
    }

    const name =
      source.key === 'internal-complaint'
        ? 'Internal Complaint Committee'
        : 'Disaster Management Committee'
    const slug =
      source.key === 'internal-complaint'
        ? 'internal-complaint-committee'
        : 'disaster-management-committee'
    const members = parseTableMembers(0, $)
    const poshAct =
      source.key === 'internal-complaint'
        ? $('a[href]')
            .filter((_index, anchor) => /POSH\s+Act/i.test(normalizeText($(anchor).text())))
            .first()
            .attr('href')
        : undefined
    const links = poshAct ? [{ label: 'POSH Act', url: poshAct }] : undefined
    seeds.push({
      name,
      slug,
      members,
      links,
      legacyPath: source.legacyPath,
      sourceUrl,
      sourceSnapshotFile,
    })
  }

  return seeds
}

export const seedCommittees = async (payload: Payload): Promise<void> => {
  const seeds = await readCommitteeSeeds()
  let created = 0
  let skipped = 0

  for (const committee of seeds) {
    const existing = await payload.find({
      collection: 'committees',
      draft: true,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: committee.slug } },
    })

    if (existing.docs[0]) {
      skipped += 1
      continue
    }

    await payload.create({
      collection: 'committees',
      data: { ...committee, _status: 'draft' },
      draft: true,
      overrideAccess: true,
    })
    created += 1
  }

  payload.logger.info(
    `Seeded ${created} committee drafts; left ${skipped} existing records unchanged`,
  )
}

export { readCommitteeSeeds }
