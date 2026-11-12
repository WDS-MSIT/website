import Link from 'next/link'

import { CmsImage } from '@/frontend/components/CmsImage'
import { findSafeHref } from '@/frontend/data/urls'
import type { Person } from '@/payload-types'

const label = (value: string): string =>
  value.replaceAll('-', ' ').replace(/^./, (character) => character.toUpperCase())

export function PersonTemplate({ person }: { person: Person }) {
  const detailedProfile =
    person.detailedProfile && typeof person.detailedProfile === 'object'
      ? person.detailedProfile
      : undefined
  const profileHref = findSafeHref(
    detailedProfile?.url || detailedProfile?.legacyUrl || person.legacyProfileUrl,
  )

  return (
    <article className="person-page">
      <header className="page-header">
        <CmsImage
          alt={`Portrait of ${person.name}`}
          legacyUrl={person.legacyPhotoUrl}
          media={person.photo}
        />
        <h1>{person.name}</h1>
        {person.primaryDesignation ? <p>{person.primaryDesignation}</p> : null}
        <p>{person.personTypes.map(label).join(', ')}</p>
      </header>

      {person.departments?.length ? (
        <section aria-labelledby="person-departments-heading" className="content-section">
          <h2 id="person-departments-heading">Departments</h2>
          <ul>
            {person.departments.map((department) =>
              typeof department === 'object' ? (
                <li key={department.id}>
                  <Link href={`/departments/${department.slug}`}>{department.name}</Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      ) : null}

      {person.biography ? (
        <section aria-labelledby="person-biography-heading" className="content-section">
          <h2 id="person-biography-heading">Biography</h2>
          <p>{person.biography}</p>
        </section>
      ) : null}

      {person.qualifications?.length ? (
        <section aria-labelledby="person-qualifications-heading" className="content-section">
          <h2 id="person-qualifications-heading">Qualifications</h2>
          <ul>
            {person.qualifications.map((qualification, index) => (
              <li key={qualification.id || index}>{qualification.qualification}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {person.roles?.length ? (
        <section aria-labelledby="person-roles-heading" className="content-section">
          <h2 id="person-roles-heading">Roles</h2>
          <ul className="record-list role-list">
            {person.roles.map((role, index) => (
              <li key={role.id || index}>
                <p>
                  {role.title || label(role.type)}
                  {role.context ? ` — ${role.context}` : ''}
                </p>
                {role.department && typeof role.department === 'object' ? (
                  <p>
                    <Link href={`/departments/${role.department.slug}`}>
                      {role.department.name}
                    </Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {person.email || person.phone || profileHref || person.vidwanId ? (
        <section aria-labelledby="person-contact-heading" className="content-section">
          <h2 id="person-contact-heading">Contact and profile</h2>
          <dl>
            {person.email ? (
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                </dd>
              </div>
            ) : null}
            {person.phone ? (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${person.phone}`}>{person.phone}</a>
                </dd>
              </div>
            ) : null}
            {profileHref ? (
              <div>
                <dt>Detailed profile</dt>
                <dd>
                  <a href={profileHref}>{detailedProfile?.title || 'View detailed profile'}</a>
                </dd>
              </div>
            ) : null}
            {person.vidwanId ? (
              <div>
                <dt>VIDWAN ID</dt>
                <dd>{person.vidwanId}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      ) : null}
    </article>
  )
}
