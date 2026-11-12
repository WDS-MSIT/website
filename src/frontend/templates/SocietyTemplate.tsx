import Link from 'next/link'

import { CmsImage } from '@/frontend/components/CmsImage'
import { RichTextContent } from '@/frontend/components/RichTextContent'
import { findSafeHref } from '@/frontend/data/urls'
import type { Document, Society } from '@/payload-types'

const documentHref = (document: Document) => findSafeHref(document.url || document.legacyUrl)

export function SocietyTemplate({ society }: { society: Society }) {
  const documents = (society.documents || []).filter(
    (document): document is Document =>
      typeof document === 'object' && Boolean(documentHref(document)),
  )

  return (
    <article className="society-page">
      <header className="page-header">
        <CmsImage alt={`${society.name} logo`} media={society.logo} />
        <h1>{society.name}</h1>
        <p>{society.category}</p>
        {society.overview ? <p>{society.overview}</p> : null}
        {society.foundedOn || society.foundedYear ? (
          <p>
            Founded:{' '}
            {society.foundedOn
              ? new Date(society.foundedOn).toLocaleDateString('en-IN')
              : society.foundedYear}
          </p>
        ) : null}
      </header>
      {society.description ? (
        <section aria-labelledby="society-about-heading" className="content-section">
          <h2 id="society-about-heading">About</h2>
          <RichTextContent data={society.description} />
        </section>
      ) : null}
      {society.facultyCoordinators?.length ? (
        <section aria-labelledby="society-faculty-heading" className="content-section">
          <h2 id="society-faculty-heading">Faculty coordinators</h2>
          <ul className="record-list">
            {society.facultyCoordinators.map((member, index) => (
              <li key={member.id || index}>
                <p>
                  {member.person && typeof member.person === 'object' ? (
                    <Link href={`/people/${member.person.slug}`}>{member.name}</Link>
                  ) : (
                    member.name
                  )}
                  {member.role ? ` — ${member.role}` : ''}
                </p>
                {member.designation ? <p>{member.designation}</p> : null}
                {member.department ? <p>{member.department}</p> : null}
                {member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {society.studentLeaders?.length ? (
        <section aria-labelledby="society-students-heading" className="content-section">
          <h2 id="society-students-heading">Student leaders</h2>
          <ul className="record-list">
            {society.studentLeaders.map((member, index) => (
              <li key={member.id || index}>
                <p>
                  {member.person && typeof member.person === 'object' ? (
                    <Link href={`/people/${member.person.slug}`}>{member.name}</Link>
                  ) : (
                    member.name
                  )}
                  {member.role ? ` — ${member.role}` : ''}
                </p>
                {member.unit || member.department ? (
                  <p>{[member.unit, member.department].filter(Boolean).join(' · ')}</p>
                ) : null}
                {member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : null}
                {member.phone ? <a href={`tel:${member.phone}`}>{member.phone}</a> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {society.contact?.emails?.length || society.contact?.phone ? (
        <section aria-labelledby="society-contact-heading" className="content-section">
          <h2 id="society-contact-heading">Contact</h2>
          <ul>
            {(society.contact.emails || []).map((item, index) => (
              <li key={item.id || index}>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </li>
            ))}
            {society.contact.phone ? (
              <li>
                <a href={`tel:${society.contact.phone}`}>{society.contact.phone}</a>
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}
      {society.externalLinks?.length || documents.length || society.legacyDocuments?.length ? (
        <section aria-labelledby="society-resources-heading" className="content-section">
          <h2 id="society-resources-heading">Links and documents</h2>
          <ul>
            {(society.externalLinks || []).map((link, index) => {
              const href = findSafeHref(link.url)
              return href ? (
                <li key={link.id || index}>
                  <a href={href}>{link.label}</a>
                </li>
              ) : null
            })}
            {documents.map((document) => (
              <li key={document.id}>
                <a href={documentHref(document)}>{document.title}</a>
              </li>
            ))}
            {(society.legacyDocuments || []).map((document, index) => {
              const href = findSafeHref(document.url)
              return href ? (
                <li key={document.id || index}>
                  <a href={href}>{document.label}</a>
                </li>
              ) : null
            })}
          </ul>
        </section>
      ) : null}
      {society.gallery?.length || society.legacyImages?.length ? (
        <section aria-labelledby="society-gallery-heading" className="content-section">
          <h2 id="society-gallery-heading">Gallery</h2>
          <ul className="media-gallery">
            {(society.gallery || []).map((item, index) => (
              <li key={item.id || index}>
                <figure>
                  <CmsImage alt={item.caption || society.name} media={item.image} />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
            {(society.legacyImages || []).map((item, index) => (
              <li key={item.id || index}>
                <CmsImage alt={`${society.name} gallery image ${index + 1}`} legacyUrl={item.url} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
