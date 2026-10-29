import { load, type CheerioAPI } from 'cheerio'
import { readFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

import { readCommitteeSeeds } from '@/seed/committees'
import { readSocietySeeds } from '@/seed/societies'

type PersonType =
  | 'administration'
  | 'committee-member'
  | 'external'
  | 'faculty'
  | 'governance'
  | 'leadership'
  | 'library-staff'
  | 'placement-staff'
  | 'society-member'
  | 'student'
  | 'technical-staff'

type PersonRoleSeed = {
  context?: string
  departmentSlug?: string
  sourceUrl: string
  title?: string
  type: PersonType
}

type SourceReference = {
  label: string
  snapshotFile: string
  url: string
}

type PersonSeed = {
  biography?: string
  departmentSlugs: string[]
  email?: string
  legacyPhotoUrl?: string
  legacyProfileUrl?: string
  name: string
  personTypes: PersonType[]
  phone?: string
  primaryDesignation?: string
  qualifications: string[]
  roles: PersonRoleSeed[]
  slug: string
  sortOrder?: number
  sourceReferences: SourceReference[]
  vidwanId?: string
}

type MutablePerson = {
  biography?: string
  departmentSlugs: Set<string>
  email?: string
  legacyPhotoUrl?: string
  legacyProfileUrl?: string
  name: string
  personTypes: Set<PersonType>
  phone?: string
  primaryDesignation?: string
  qualifications: Set<string>
  roles: PersonRoleSeed[]
  sortOrder?: number
  sourceReferences: SourceReference[]
  studentIdentity: boolean
  vidwanId?: string
}

type PersonCandidate = {
  biography?: string
  departmentSlugs?: string[]
  email?: string
  legacyPhotoUrl?: string
  legacyProfileUrl?: string
  name: string
  personTypes: PersonType[]
  phone?: string
  primaryDesignation?: string
  qualifications?: string[]
  roles?: PersonRoleSeed[]
  sortOrder?: number
  sourceReference: SourceReference
  studentIdentity?: boolean
  vidwanId?: string
}

const pagesDirectory = path.resolve(process.cwd(), 'docs/references/snapshot/pages')

const departmentSources = [
  { departmentSlug: 'cse', file: 'cse.html' },
  { departmentSlug: 'it', file: 'it.html' },
  { departmentSlug: 'ece', file: 'ece.html' },
  { departmentSlug: 'eee', file: 'eee.html' },
  { departmentSlug: 'applied-sciences', file: 'ap.html' },
]

const departmentAliases: Record<string, string> = {
  'applied sciences': 'applied-sciences',
  'app sc': 'applied-sciences',
  'app. sc': 'applied-sciences',
  cse: 'cse',
  ece: 'ece',
  eee: 'eee',
  it: 'it',
}

const nameAliases: Record<string, string> = {
  'anju dhillon': 'anju singh dhillon',
  'jasmin chikara': 'jasmine chikara',
  'jasmine chhikara': 'jasmine chikara',
  'rajbir singh rathee': 'r s rathee',
}

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

const cleanPersonName = (value: string): string =>
  normalizeText(value)
    .replace(/,\s*(CSE|IT|ECE|EEE|App\.?\s*Sc\.?)$/i, '')
    .replace(/^(?:Prof\.?\s*\(Dr\.?\)|Prof\.?\s*Dr\.?|Prof\.?|Dr\.?|Mr\.?|Mrs\.?|Ms\.?|Smt\.?|Sh\.?)\s+/i, '')
    .trim()

const normalizePersonName = (value: string): string => {
  const normalized = cleanPersonName(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

  return nameAliases[normalized] || normalized
}

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

const absoluteLegacyUrl = (value: string): string => new URL(value, 'https://msit.in').href

const departmentSlug = (value?: string): string | undefined => {
  if (!value) return undefined
  const normalized = normalizeText(value).toLowerCase().replace(/^deptt?\.?\s*(?:of)?\s*/i, '')
  return departmentAliases[normalized]
}

const isPlaceholder = (name: string): boolean =>
  /^(?:director|dirctor|official from ggsipu|senior professor of ggsipu|to be nominated)$/i.test(
    normalizeText(name),
  )

const sourceReference = (file: string, label: string, legacyPath: string): SourceReference => ({
  label,
  snapshotFile: `docs/references/snapshot/pages/${file}`,
  url: absoluteLegacyUrl(legacyPath),
})

const addCandidate = (people: Map<string, MutablePerson>, candidate: PersonCandidate): void => {
  if (isPlaceholder(candidate.name)) return

  const name = cleanPersonName(candidate.name)
  if (!name) return

  const studentIdentity = candidate.studentIdentity || candidate.personTypes.includes('student')
  const baseKey = `${studentIdentity ? 'student' : 'person'}:${normalizePersonName(name)}`
  const matchingPeople = [...people.entries()].filter(
    ([key]) => key === baseKey || key.startsWith(`${baseKey}#`),
  )
  const exactIdentity = matchingPeople.find(
    ([, person]) =>
      (candidate.vidwanId && person.vidwanId === candidate.vidwanId) ||
      (candidate.email && person.email?.toLowerCase() === candidate.email.toLowerCase()),
  )
  const compatiblePeople = matchingPeople.filter(
    ([, person]) =>
      (!candidate.vidwanId || !person.vidwanId || person.vidwanId === candidate.vidwanId) &&
      (!candidate.email || !person.email || person.email.toLowerCase() === candidate.email.toLowerCase()),
  )
  const selected = exactIdentity || (compatiblePeople.length === 1 ? compatiblePeople[0] : undefined)
  const key = selected?.[0] || (matchingPeople.length ? `${baseKey}#${matchingPeople.length + 1}` : baseKey)
  const person = selected?.[1] || {
    departmentSlugs: new Set<string>(),
    name,
    personTypes: new Set<PersonType>(),
    qualifications: new Set<string>(),
    roles: [],
    sourceReferences: [],
    studentIdentity,
  }

  if (name.length > person.name.length) person.name = name
  for (const type of candidate.personTypes) person.personTypes.add(type)
  for (const slug of candidate.departmentSlugs || []) person.departmentSlugs.add(slug)
  for (const qualification of candidate.qualifications || []) {
    if (qualification) person.qualifications.add(qualification)
  }

  for (const role of candidate.roles || []) {
    const duplicate = person.roles.some(
      (existing) =>
        existing.type === role.type &&
        existing.title === role.title &&
        existing.context === role.context &&
        existing.departmentSlug === role.departmentSlug,
    )
    if (!duplicate) person.roles.push(role)
  }

  const hasSource = person.sourceReferences.some(
    (source) =>
      source.url === candidate.sourceReference.url &&
      source.label === candidate.sourceReference.label,
  )
  if (!hasSource) person.sourceReferences.push(candidate.sourceReference)

  person.biography ||= candidate.biography
  person.email ||= candidate.email
  person.phone ||= candidate.phone
  person.legacyPhotoUrl ||= candidate.legacyPhotoUrl
  person.legacyProfileUrl ||= candidate.legacyProfileUrl
  person.primaryDesignation ||= candidate.primaryDesignation
  person.sortOrder ??= candidate.sortOrder
  person.vidwanId ||= candidate.vidwanId
  people.set(key, person)
}

const parseFaculty = async (people: Map<string, MutablePerson>): Promise<void> => {
  let globalOrder = 0

  for (const source of departmentSources) {
    const html = await readFile(path.join(pagesDirectory, source.file), 'utf8')
    const $ = load(html)
    const sourceUrl = `https://msit.in/${source.file.replace(/\.html$/, '')}`
    const reference = sourceReference(source.file, 'Department faculty profile', sourceUrl)

    $('#firstshift tr, #secondshift tr').each((_rowIndex, row) => {
      const facultyRow = $(row)
      const heading = facultyRow
        .find('p')
        .filter((_index, paragraph) =>
          ($(paragraph).attr('style') || '').toLowerCase().includes('font-weight: bold'),
        )
        .first()
      const profile = facultyRow.find('.faculty-description').first()
      if (!heading.length || !profile.length) return

      const headingWithLines = heading.clone()
      headingWithLines.find('br').replaceWith('\n')
      const headingLines = headingWithLines.text().split('\n').map(normalizeText).filter(Boolean)
      if (headingLines.length < 2) return

      const name = normalizeText(headingLines[0].split('|')[0])
      const details = headingLines.slice(1).join(' | ')
      const detailParts = details.split('|').map(normalizeText).filter(Boolean)
      const designation = detailParts[0]
      if (!name || !designation) return

      const qualification = detailParts
        .slice(1)
        .filter((part) => part.toLowerCase() !== 'hod' && !/shift/i.test(part))
        .join(', ')
      const isHead = detailParts.some((part) => /^hod$/i.test(part))
      const protectedEmail = facultyRow.find('[data-cfemail]').first().attr('data-cfemail')
      const email = protectedEmail ? decodeCloudflareEmail(protectedEmail) : undefined
      const profileText = normalizeText(profile.text())
      const vidwanId = profileText.match(/vidwan\s*(?:id)?\s*[-:]?\s*(\d+)/i)?.[1]
      const biographyParagraphs: string[] = []

      profile.find('p').each((_paragraphIndex, paragraphElement) => {
        const paragraph = $(paragraphElement).clone()
        const originalText = normalizeText(paragraph.text())
        if (/^vidwan\s*(?:id)?/i.test(originalText)) return

        paragraph.find('a[href$=".pdf"]').remove()
        const text = normalizeText(paragraph.text())
        if (text && !/^det(?:ailed|iled) profile$/i.test(text)) biographyParagraphs.push(text)
      })

      const photo = facultyRow.find('img[src]').first().attr('src')
      const detailedProfile = facultyRow.find('a[href$=".pdf"]').first().attr('href')
      globalOrder += 10
      const roles: PersonRoleSeed[] = [
        {
          departmentSlug: source.departmentSlug,
          sourceUrl,
          title: designation,
          type: 'faculty',
        },
      ]
      const personTypes: PersonType[] = ['faculty']

      if (isHead) {
        personTypes.push('leadership')
        roles.push({
          context: 'Head of Department',
          departmentSlug: source.departmentSlug,
          sourceUrl,
          title: 'Head of Department',
          type: 'leadership',
        })
      }

      addCandidate(people, {
        biography: biographyParagraphs.join('\n\n') || undefined,
        departmentSlugs: [source.departmentSlug],
        email,
        legacyPhotoUrl: photo ? absoluteLegacyUrl(photo) : undefined,
        legacyProfileUrl: detailedProfile ? absoluteLegacyUrl(detailedProfile) : undefined,
        name,
        personTypes,
        primaryDesignation: designation,
        qualifications: qualification ? [qualification] : [],
        roles,
        sortOrder: globalOrder,
        sourceReference: reference,
        vidwanId,
      })
    })
  }
}

const administrativeType = (section: string, designation: string): PersonType => {
  if (/library/i.test(section)) return 'library-staff'
  if (/placement/i.test(section)) return 'placement-staff'
  if (/lab|technical|programmer/i.test(designation)) return 'technical-staff'
  return 'administration'
}

const parseAdministration = async (people: Map<string, MutablePerson>): Promise<void> => {
  const file = 'administration.html'
  const html = await readFile(path.join(pagesDirectory, file), 'utf8')
  const $ = load(html)
  const sourceUrl = 'https://msit.in/administration'
  const reference = sourceReference(file, 'Administration', '/administration')
  const director = $('#director').first()
  const directorName = director
    .find('p')
    .toArray()
    .map((paragraph) => normalizeText($(paragraph).text()))
    .find((text) => /Avanish Kumar Srivastava/i.test(text))
  const photo = director.find('img[src]').first().attr('src')
  const protectedEmail = director.find('[data-cfemail]').first().attr('data-cfemail')
  const biography = director
    .find('p')
    .toArray()
    .map((paragraph) => normalizeText($(paragraph).text()))
    .find((text) => text.length > 500)

  if (directorName) {
    addCandidate(people, {
      biography,
      email: protectedEmail ? decodeCloudflareEmail(protectedEmail) : undefined,
      legacyPhotoUrl: photo ? absoluteLegacyUrl(photo) : undefined,
      name: directorName,
      personTypes: ['leadership'],
      primaryDesignation: 'Director',
      roles: [{ context: 'MSIT', sourceUrl, title: 'Director', type: 'leadership' }],
      sourceReference: reference,
    })
  }

  let section = 'Administrative staff'
  $('#administrative-staff table tr').each((_index, row) => {
    const cells = $(row).find('td').toArray()
    if (!cells.length) return

    if (cells.length === 1 || $(cells[0]).attr('colspan')) {
      section = normalizeText($(cells[0]).text()) || section
      return
    }

    const name = normalizeText($(cells[0]).text())
    const designation = normalizeText($(cells[1]).text())
    if (!name || !designation || /^name$/i.test(name)) return

    const type = administrativeType(section, designation)
    addCandidate(people, {
      name,
      personTypes: [type],
      primaryDesignation: designation,
      roles: [{ context: section, sourceUrl, title: designation, type }],
      sourceReference: reference,
    })
  })
}

const signatureLines = ($: CheerioAPI, selector: string): string[] => {
  const signature = $(selector).find('p strong').last().clone()
  signature.find('br').replaceWith('\n')
  return signature.text().split('\n').map(normalizeText).filter(Boolean)
}

const parseLeadershipMessages = async (people: Map<string, MutablePerson>): Promise<void> => {
  const file = 'fromdesk.html'
  const html = await readFile(path.join(pagesDirectory, file), 'utf8')
  const $ = load(html)
  const sourceUrl = 'https://msit.in/fromdesk'
  const reference = sourceReference(file, 'Leadership message', '/fromdesk')

  for (const id of ['president', 'secretary', 'treasurer', 'director']) {
    const pane = `#${id}`
    const lines = signatureLines($, pane)
    if (!lines.length) continue

    const name = id === 'director' ? 'Avanish Kumar Srivastava' : lines[0]
    const title = id === 'director' ? 'Director' : id[0].toUpperCase() + id.slice(1)
    const context = id === 'director' ? 'MSIT' : 'Surajmal Memorial Education Society'
    const image = $(pane).find('img[src]').first().attr('src')
    const biography = $(pane)
      .find('p')
      .toArray()
      .map((paragraph) => normalizeText($(paragraph).text()))
      .filter((text) => text.length > 80 && !text.includes(name))
      .join('\n\n')

    addCandidate(people, {
      biography: biography || undefined,
      legacyPhotoUrl: image ? absoluteLegacyUrl(image) : undefined,
      name,
      personTypes: ['leadership', 'governance'],
      primaryDesignation: title,
      roles: [{ context, sourceUrl, title, type: 'leadership' }],
      sourceReference: reference,
    })
  }
}

const parseGovernance = async (people: Map<string, MutablePerson>): Promise<void> => {
  const file = 'govern.html'
  const html = await readFile(path.join(pagesDirectory, file), 'utf8')
  const $ = load(html)
  const sourceUrl = 'https://msit.in/govern'
  const reference = sourceReference(file, 'Governing Body and Advisory Board', '/govern')
  const tables = $('.centralcontent table').toArray()
  const governingTable = tables.find((table) => /Chairman/i.test(normalizeText($(table).text())))

  if (governingTable) {
    let section = 'Governing Body Member'
    $(governingTable)
      .find('tr')
      .each((_index, row) => {
        const cells = $(row).find('td').toArray()
        const heading = cells.find((cell) => $(cell).attr('colspan'))
        if (heading) {
          section = normalizeText($(heading).text()) || section
          return
        }

        for (const cell of cells) {
          const name = normalizeText($(cell).find('strong').first().text())
          if (!name) continue
          const paragraphs = $(cell)
            .find('p')
            .toArray()
            .map((paragraph) => normalizeText($(paragraph).text()))
            .filter(Boolean)
          const designation = paragraphs.find((text) => normalizePersonName(text) !== normalizePersonName(name))

          addCandidate(people, {
            name,
            personTypes: ['governance'],
            primaryDesignation: designation || section,
            roles: [
              {
                context: 'MSIT Governing Body',
                sourceUrl,
                title: designation || section,
                type: 'governance',
              },
            ],
            sourceReference: reference,
          })
        }
      })
  }

  const advisoryTable = tables.find((table) => /Prof\.\s*A\.\s*Q\.?\s*Ansari/i.test($(table).text()))
  if (!advisoryTable) return

  $(advisoryTable)
    .find('tr')
    .each((_index, row) => {
      const cells = $(row).find('td').toArray()
      if (cells.length < 2) return
      const name = normalizeText($(cells[0]).text())
      const context = normalizeText($(cells[1]).text())
      if (!name) return

      addCandidate(people, {
        name,
        personTypes: ['external', 'governance'],
        primaryDesignation: 'Advisory Board Member',
        roles: [
          {
            context: context || 'MSIT Advisory Board',
            sourceUrl,
            title: 'Advisory Board Member',
            type: 'governance',
          },
        ],
        sourceReference: reference,
      })
    })
}

const committeePersonType = (designation?: string): PersonType | undefined => {
  if (!designation) return undefined
  if (/student/i.test(designation)) return 'student'
  if (/administration|administrative|admin officer/i.test(designation)) return 'administration'
  if (/lab assistant|technical|programmer/i.test(designation)) return 'technical-staff'
  if (/ngo|parent|alumni|employer/i.test(designation)) return 'external'
  if (/professor|faculty|dean|warden/i.test(designation)) return 'faculty'
  return undefined
}

const parseCommitteePeople = async (people: Map<string, MutablePerson>): Promise<void> => {
  const committees = await readCommitteeSeeds()

  for (const committee of committees) {
    for (const member of committee.members) {
      const inferredType = committeePersonType(member.designation)
      const studentIdentity = inferredType === 'student'
      const types: PersonType[] = ['committee-member']
      if (inferredType) types.push(inferredType)

      addCandidate(people, {
        email: member.email,
        name: member.name,
        personTypes: types,
        phone: member.phone,
        primaryDesignation: member.designation,
        roles: [
          {
            context: committee.name,
            sourceUrl: committee.sourceUrl,
            title: member.committeeRole || member.designation || 'Member',
            type: 'committee-member',
          },
        ],
        sourceReference: {
          label: committee.name,
          snapshotFile: committee.sourceSnapshotFile,
          url: committee.sourceUrl,
        },
        studentIdentity,
      })
    }
  }
}

const parseSocietyPeople = async (people: Map<string, MutablePerson>): Promise<void> => {
  const { seeds } = await readSocietySeeds()

  for (const society of seeds) {
    for (const coordinator of society.facultyCoordinators) {
      const slug = departmentSlug(coordinator.department)
      const facultyType = /professor|faculty/i.test(coordinator.designation || '')
      addCandidate(people, {
        departmentSlugs: slug ? [slug] : [],
        email: coordinator.email,
        name: coordinator.name,
        personTypes: facultyType ? ['faculty', 'society-member'] : ['society-member'],
        primaryDesignation: coordinator.designation,
        roles: [
          {
            context: society.name,
            departmentSlug: slug,
            sourceUrl: society.sourceUrl,
            title: coordinator.role || coordinator.designation || 'Faculty Coordinator',
            type: 'society-member',
          },
        ],
        sourceReference: {
          label: `${society.name} society`,
          snapshotFile: society.sourceSnapshotFile,
          url: society.sourceUrl,
        },
      })
    }

    for (const student of society.studentLeaders) {
      const slug = departmentSlug(student.department)
      addCandidate(people, {
        departmentSlugs: slug ? [slug] : [],
        email: student.email,
        name: student.name,
        personTypes: ['student', 'society-member'],
        phone: student.phone,
        primaryDesignation: student.role,
        roles: [
          {
            context: student.unit ? `${society.name} — ${student.unit}` : society.name,
            departmentSlug: slug,
            sourceUrl: society.sourceUrl,
            title: student.role || 'Student member',
            type: 'society-member',
          },
        ],
        sourceReference: {
          label: `${society.name} society`,
          snapshotFile: society.sourceSnapshotFile,
          url: society.sourceUrl,
        },
        studentIdentity: true,
      })
    }
  }
}

export const readPeopleSeeds = async (): Promise<PersonSeed[]> => {
  const people = new Map<string, MutablePerson>()

  await parseFaculty(people)
  await parseAdministration(people)
  await parseLeadershipMessages(people)
  await parseGovernance(people)
  await parseCommitteePeople(people)
  await parseSocietyPeople(people)

  const usedSlugs = new Set<string>()

  return [...people.values()]
    .map((person) => ({
      biography: person.biography,
      departmentSlugs: [...person.departmentSlugs],
      email: person.email,
      legacyPhotoUrl: person.legacyPhotoUrl,
      legacyProfileUrl: person.legacyProfileUrl,
      name: person.name,
      personTypes: [...person.personTypes],
      phone: person.phone,
      primaryDesignation: person.primaryDesignation,
      qualifications: [...person.qualifications],
      roles: person.roles,
      slug: (() => {
        const base = `${person.studentIdentity ? 'student-' : ''}${slugify(person.name)}`
        if (!usedSlugs.has(base)) {
          usedSlugs.add(base)
          return base
        }

        const hint = person.vidwanId || person.email?.split('@')[0] || String(usedSlugs.size + 1)
        let candidate = `${base}-${slugify(hint)}`
        let counter = 2
        while (usedSlugs.has(candidate)) {
          candidate = `${base}-${slugify(hint)}-${counter}`
          counter += 1
        }
        usedSlugs.add(candidate)
        return candidate
      })(),
      sortOrder: person.sortOrder,
      sourceReferences: person.sourceReferences,
      vidwanId: person.vidwanId,
    }))
    .sort((left, right) => left.name.localeCompare(right.name))
}

export const seedPeople = async (payload: Payload): Promise<void> => {
  const [seeds, departmentsResult, existingResult] = await Promise.all([
    readPeopleSeeds(),
    payload.find({
      collection: 'departments',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
    payload.find({
      collection: 'people',
      draft: true,
      limit: 0,
      overrideAccess: true,
      pagination: false,
    }),
  ])
  const departmentIds = new Map(departmentsResult.docs.map((item) => [item.slug, item.id]))
  const existingSlugs = new Set(existingResult.docs.map((item) => item.slug))
  const vidwanCounts = new Map<string, number>()

  for (const person of seeds) {
    if (person.vidwanId) {
      vidwanCounts.set(person.vidwanId, (vidwanCounts.get(person.vidwanId) || 0) + 1)
    }
  }

  const duplicateVidwanIds = new Set(
    [...vidwanCounts.entries()].filter(([, count]) => count > 1).map(([id]) => id),
  )
  let created = 0
  let skipped = 0

  for (const person of seeds) {
    if (existingSlugs.has(person.slug)) {
      skipped += 1
      continue
    }

    const departments = person.departmentSlugs.map((slug) => {
      const id = departmentIds.get(slug)
      if (!id) throw new Error(`Department ${slug} must be seeded before people`)
      return id
    })
    const roles = person.roles.map((role) => {
      const department = role.departmentSlug
        ? departmentIds.get(role.departmentSlug)
        : undefined
      if (role.departmentSlug && !department) {
        throw new Error(`Department ${role.departmentSlug} must be seeded before people`)
      }

      return {
        context: role.context,
        department,
        sourceUrl: role.sourceUrl,
        title: role.title,
        type: role.type,
      }
    })

    await payload.create({
      collection: 'people',
      data: {
        _status: 'draft',
        biography: person.biography,
        departments,
        email: person.email,
        legacyPhotoUrl: person.legacyPhotoUrl,
        legacyProfileUrl: person.legacyProfileUrl,
        name: person.name,
        personTypes: person.personTypes,
        phone: person.phone,
        primaryDesignation: person.primaryDesignation,
        qualifications: person.qualifications.map((qualification) => ({ qualification })),
        reviewStatus: 'unreviewed',
        roles,
        slug: person.slug,
        sortOrder: person.sortOrder,
        sourceReferences: person.sourceReferences,
        vidwanId:
          person.vidwanId && !duplicateVidwanIds.has(person.vidwanId)
            ? person.vidwanId
            : undefined,
      },
      draft: true,
      overrideAccess: true,
    })
    existingSlugs.add(person.slug)
    created += 1
  }

  if (duplicateVidwanIds.size) {
    payload.logger.warn(
      `Skipped ${duplicateVidwanIds.size} conflicting Vidwan ID value(s) found in the source pages`,
    )
  }

  payload.logger.info(`Seeded ${created} people drafts; left ${skipped} existing records unchanged`)
}
