import Link from 'next/link'

import { CmsImage } from '@/frontend/components/CmsImage'
import { RichTextContent } from '@/frontend/components/RichTextContent'
import { findSafeHref } from '@/frontend/data/urls'
import type { Facility } from '@/payload-types'

const label = (value: string): string =>
  value.replaceAll('-', ' ').replace(/^./, (character) => character.toUpperCase())

export function FacilityTemplate({ facility }: { facility: Facility }) {
  const department = typeof facility.department === 'object' ? facility.department : undefined

  return (
    <article className="facility-page">
      <header className="page-header">
        <h1>{facility.name}</h1>
        <dl>
          {facility.type ? (
            <div>
              <dt>Type</dt>
              <dd>{label(facility.type)}</dd>
            </div>
          ) : null}
          {department ? (
            <div>
              <dt>Department</dt>
              <dd>
                <Link href={`/departments/${department.slug}`}>{department.name}</Link>
              </dd>
            </div>
          ) : null}
          {facility.location ? (
            <div>
              <dt>Location</dt>
              <dd>{facility.location}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      {facility.description ? (
        <section aria-labelledby="facility-description-heading" className="content-section">
          <h2 id="facility-description-heading">About this facility</h2>
          <RichTextContent data={facility.description} />
        </section>
      ) : null}

      {facility.lab?.equipment ? (
        <section aria-labelledby="facility-equipment-heading" className="content-section">
          <h2 id="facility-equipment-heading">Equipment and system configuration</h2>
          <RichTextContent data={facility.lab.equipment} />
        </section>
      ) : null}

      {facility.lab?.descriptions?.length ? (
        <section aria-labelledby="facility-labs-heading" className="content-section">
          <h2 id="facility-labs-heading">Laboratories</h2>
          {facility.lab.descriptions.map((lab, index) => (
            <article className="laboratory-summary" key={lab.id || index}>
              <h3>{lab.name}</h3>
              {lab.description ? <RichTextContent data={lab.description} /> : null}
            </article>
          ))}
        </section>
      ) : null}

      {facility.lab?.subjects?.length ? (
        <section aria-labelledby="facility-subjects-heading" className="content-section">
          <h2 id="facility-subjects-heading">Subjects</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Subject</th>
                <th scope="col">Code</th>
                <th scope="col">Class, branch or semester</th>
              </tr>
            </thead>
            <tbody>
              {facility.lab.subjects.map((subject, index) => (
                <tr key={subject.id || index}>
                  <td>{subject.name}</td>
                  <td>{subject.code || ''}</td>
                  <td>{subject.classSemester || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {facility.lab?.software?.length ? (
        <section aria-labelledby="facility-software-heading" className="content-section">
          <h2 id="facility-software-heading">Software</h2>
          <ul>
            {facility.lab.software.map((software, index) => (
              <li key={software.id || index}>{software.name}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {facility.gallery?.length ? (
        <section aria-labelledby="facility-gallery-heading" className="content-section">
          <h2 id="facility-gallery-heading">Gallery</h2>
          <ul className="media-gallery">
            {facility.gallery.map((item, index) => (
              <li key={item.id || index}>
                <figure>
                  <CmsImage alt={item.caption || facility.name} media={item.image} />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {facility.links?.length ? (
        <section aria-labelledby="facility-links-heading" className="content-section">
          <h2 id="facility-links-heading">Related links</h2>
          <ul>
            {facility.links.map((link, index) => {
              const href = findSafeHref(link.url)
              return href ? (
                <li key={link.id || index}>
                  <a href={href}>{link.label}</a>
                </li>
              ) : null
            })}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
