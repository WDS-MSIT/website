import Link from 'next/link'

import type { DepartmentPageData } from '@/frontend/data/departments'

const formatLevel = (value: string): string =>
  value.replaceAll('-', ' ').replace(/^./, (character) => character.toUpperCase())

export function DepartmentTemplate({
  department,
  facilities,
  people,
  programmes,
}: DepartmentPageData) {
  return (
    <article className="department-page">
      <header className="page-header">
        <h1>{department.name}</h1>
        {department.code ? <p>{department.code}</p> : null}
      </header>

      <section aria-labelledby="department-overview-heading" className="content-section">
        <h2 id="department-overview-heading">Overview</h2>
        <p>{department.overview}</p>
      </section>

      {department.vision ? (
        <section aria-labelledby="department-vision-heading" className="content-section">
          <h2 id="department-vision-heading">Vision</h2>
          <p>{department.vision}</p>
        </section>
      ) : null}

      {department.missions?.length ? (
        <section aria-labelledby="department-mission-heading" className="content-section">
          <h2 id="department-mission-heading">Mission</h2>
          <ol>
            {department.missions.map((mission, index) => (
              <li key={mission.id || index}>{mission.statement}</li>
            ))}
          </ol>
        </section>
      ) : null}

      <section aria-labelledby="department-programmes-heading" className="content-section">
        <h2 id="department-programmes-heading">Programmes</h2>
        {programmes.length ? (
          <ul className="record-list programme-list">
            {programmes.map((programme) => (
              <li key={programme.id}>
                <article className="programme-summary">
                  <h3>
                    <Link href={`/programmes/${programme.slug}`}>{programme.name}</Link>
                  </h3>
                  <p>
                    {programme.degree} · {formatLevel(programme.level)}
                    {programme.durationYears
                      ? ` · ${programme.durationYears} year${programme.durationYears === 1 ? '' : 's'}`
                      : ''}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>No published programmes are currently linked to this department.</p>
        )}
      </section>

      <section aria-labelledby="department-people-heading" className="content-section">
        <h2 id="department-people-heading">People</h2>
        {people.length ? (
          <ul className="record-list people-list">
            {people.map((person) => (
              <li key={person.id}>
                <article className="person-summary">
                  <h3>
                    <Link href={`/people/${person.slug}`}>{person.name}</Link>
                  </h3>
                  {person.primaryDesignation ? <p>{person.primaryDesignation}</p> : null}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>No published people are currently linked to this department.</p>
        )}
      </section>

      <section aria-labelledby="department-facilities-heading" className="content-section">
        <h2 id="department-facilities-heading">Facilities</h2>
        {facilities.length ? (
          <ul className="record-list facility-list">
            {facilities.map((facility) => (
              <li key={facility.id}>
                <article className="facility-summary">
                  <h3>
                    <Link href={`/facilities/${facility.slug}`}>{facility.name}</Link>
                  </h3>
                  {facility.type ? <p>{formatLevel(facility.type)}</p> : null}
                  {facility.location ? <p>Location: {facility.location}</p> : null}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>No published facilities are currently linked to this department.</p>
        )}
      </section>
    </article>
  )
}
