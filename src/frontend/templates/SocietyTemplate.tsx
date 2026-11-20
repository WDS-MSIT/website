import { ArrowLeft, ExternalLink, FileText, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { CmsImage } from '@/frontend/components/CmsImage'
import { RichTextContent } from '@/frontend/components/RichTextContent'
import { KeyFiguresStrip } from '@/frontend/components/site/KeyFiguresStrip'
import { PageHero } from '@/frontend/components/site/PageHero'
import { findSafeHref } from '@/frontend/data/urls'
import { findSocietyFounded, SOCIETY_CATEGORY_LABELS } from '@/frontend/templates/SocietyIndexTemplate'
import type { Document, Society } from '@/payload-types'

const documentHref = (document: Document) => findSafeHref(document.url || document.legacyUrl)

type Member = {
  id?: null | string
  name: string
  role?: null | string
  details: string[]
  email?: null | string
  phone?: null | string
  personSlug?: string
}

// The hero shows one sentence; the full overview stays in the About section and the meta description.
const firstSentence = (text?: null | string): string | undefined => {
  if (!text) return undefined
  const match = text.match(/^.+?[.!?](?=\s|$)/)
  return (match ? match[0] : text).trim()
}

const personSlug = (person: unknown): string | undefined =>
  person && typeof person === 'object' && 'slug' in person && typeof person.slug === 'string'
    ? person.slug
    : undefined

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="bg-white rounded-2xl ring-1 ring-slate-200/70 p-5 sm:p-8">
      <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6" id={id}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function MemberGrid({ members }: { members: Member[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
      {members.map((member, index) => (
        <li className="rounded-xl bg-surface ring-1 ring-slate-200/70 p-3 sm:p-4 min-w-0" key={member.id || index}>
          <p className="text-[13px] sm:text-base font-bold text-slate-900 leading-snug">
            {member.personSlug ? (
              <Link className="hover:text-primary transition-colors" href={`/people/${member.personSlug}`}>
                {member.name}
              </Link>
            ) : (
              member.name
            )}
          </p>
          {member.role ? (
            <p className="mt-0.5 text-[11px] sm:text-sm font-semibold text-primary leading-snug">{member.role}</p>
          ) : null}
          {member.details.length ? (
            <p className="mt-1 text-[11px] sm:text-xs text-slate-600 leading-snug">{member.details.join(' · ')}</p>
          ) : null}
          {member.email || member.phone ? (
            <div className="mt-2 flex flex-col gap-1 text-[11px] sm:text-xs">
              {member.email ? (
                <a
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-primary truncate"
                  href={`mailto:${member.email}`}
                >
                  <Mail aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </a>
              ) : null}
              {member.phone ? (
                <a className="inline-flex items-center gap-1.5 text-slate-700 hover:text-primary" href={`tel:${member.phone}`}>
                  <Phone aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  {member.phone}
                </a>
              ) : null}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function SocietyTemplate({ society }: { society: Society }) {
  const documents = (society.documents || []).filter(
    (document): document is Document => typeof document === 'object' && Boolean(documentHref(document)),
  )
  const links = [
    ...(society.externalLinks || []).map((link) => ({
      label: link.label,
      href: findSafeHref(link.url),
      document: false,
    })),
    ...documents.map((document) => ({ label: document.title, href: documentHref(document), document: true })),
    ...(society.legacyDocuments || []).map((document) => ({
      label: document.label,
      href: findSafeHref(document.url),
      document: true,
    })),
  ].filter((link): link is { label: string; href: string; document: boolean } => Boolean(link.href))

  const faculty: Member[] = (society.facultyCoordinators || []).map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    details: [member.designation, member.department].filter((value): value is string => Boolean(value)),
    email: member.email,
    personSlug: personSlug(member.person),
  }))
  const students: Member[] = (society.studentLeaders || []).map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    details: [member.unit, member.department].filter((value): value is string => Boolean(value)),
    email: member.email,
    phone: member.phone,
    personSlug: personSlug(member.person),
  }))
  const contactEmails = (society.contact?.emails || []).map((item) => item.email).filter(Boolean)
  const contactPhone = society.contact?.phone
  const gallery = [
    ...(society.gallery || []).map((item) => ({ id: item.id, media: item.image, caption: item.caption })),
    ...(society.legacyImages || []).map((item) => ({ id: item.id, legacyUrl: item.url, caption: undefined })),
  ]

  const founded = findSocietyFounded(society)
  const category = society.category !== 'unclassified' ? SOCIETY_CATEGORY_LABELS[society.category] : undefined
  const figures = [
    ...(founded ? [{ label: 'Founded', value: String(founded) }] : []),
    ...(faculty.length ? [{ label: 'Faculty mentors', value: String(faculty.length) }] : []),
    ...(students.length ? [{ label: 'Student leaders', value: String(students.length) }] : []),
    ...(category ? [{ label: 'Category', value: category }] : []),
  ]
  const hasSidebar = Boolean(contactEmails.length || contactPhone || links.length)

  return (
    <article className="bg-surface">
      <PageHero
        description={firstSentence(society.overview)}
        heroImage="/campus-hero.webp"
        heroImageAlt="MSIT campus"
        title={society.name}
      />
      <KeyFiguresStrip items={figures} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark mb-6 sm:mb-8"
          href="/societies"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
          All societies
        </Link>

        <div className={`grid gap-6 sm:gap-8 ${hasSidebar ? 'lg:grid-cols-3' : ''}`}>
          <div className={`space-y-6 sm:space-y-8 min-w-0 ${hasSidebar ? 'lg:col-span-2' : ''}`}>
            {society.description ? (
              <Section id="society-about-heading" title="About">
                <RichTextContent data={society.description} />
              </Section>
            ) : society.overview ? (
              <Section id="society-about-heading" title="About">
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base">{society.overview}</p>
              </Section>
            ) : null}
            {faculty.length ? (
              <Section id="society-faculty-heading" title="Faculty coordinators">
                <MemberGrid members={faculty} />
              </Section>
            ) : null}
            {students.length ? (
              <Section id="society-students-heading" title="Student team">
                <MemberGrid members={students} />
              </Section>
            ) : null}
            {gallery.length ? (
              <Section id="society-gallery-heading" title="Gallery">
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                  {gallery.map((item, index) => (
                    <li key={item.id || index}>
                      <figure>
                        <CmsImage
                          alt={item.caption || `${society.name} photo ${index + 1}`}
                          className="w-full aspect-[4/3] object-cover rounded-xl ring-1 ring-slate-200/70"
                          legacyUrl={'legacyUrl' in item ? item.legacyUrl : undefined}
                          media={'media' in item ? item.media : undefined}
                        />
                        {item.caption ? (
                          <figcaption className="mt-1.5 text-xs text-slate-600">{item.caption}</figcaption>
                        ) : null}
                      </figure>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}
          </div>

          {hasSidebar ? (
            <aside className="space-y-6 sm:space-y-8 min-w-0">
              {contactEmails.length || contactPhone ? (
                <Section id="society-contact-heading" title="Contact">
                  <ul className="space-y-3 text-sm">
                    {contactEmails.map((email) => (
                      <li key={email}>
                        <a className="flex items-center gap-3 text-slate-700 hover:text-primary break-all" href={`mailto:${email}`}>
                          <Mail aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                          {email}
                        </a>
                      </li>
                    ))}
                    {contactPhone ? (
                      <li>
                        <a className="flex items-center gap-3 text-slate-700 hover:text-primary" href={`tel:${contactPhone}`}>
                          <Phone aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                          {contactPhone}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </Section>
              ) : null}
              {links.length ? (
                <Section id="society-links-heading" title="Links & documents">
                  <ul className="space-y-2">
                    {links.map((link, index) => {
                      const Icon = link.document ? FileText : ExternalLink
                      return (
                        <li key={`${link.href}-${index}`}>
                          <a
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 bg-surface ring-1 ring-slate-200/70 hover:ring-primary/40 hover:text-primary transition-colors"
                            href={link.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Icon aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                            <span className="min-w-0 break-words">{link.label}</span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </Section>
              ) : null}
            </aside>
          ) : null}
        </div>
      </div>
    </article>
  )
}
