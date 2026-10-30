import Link from 'next/link'

import type { Facility } from '@/payload-types'

const groupName = (facility: Facility): string =>
  facility.department && typeof facility.department === 'object'
    ? facility.department.name
    : 'Institute facilities'

const label = (value: string): string =>
  value.replaceAll('-', ' ').replace(/^./, (character) => character.toUpperCase())

export function FacilityIndexTemplate({ facilities }: { facilities: Facility[] }) {
  const groups = new Map<string, Facility[]>()

  for (const facility of facilities) {
    const name = groupName(facility)
    groups.set(name, [...(groups.get(name) || []), facility])
  }

  return (
    <article className="facility-index">
      <header className="page-header">
        <h1>Facilities</h1>
      </header>

      {groups.size ? (
        [...groups.entries()].map(([name, items]) => (
          <section
            aria-labelledby={`facility-group-${items[0].id}`}
            className="content-section"
            key={name}
          >
            <h2 id={`facility-group-${items[0].id}`}>{name}</h2>
            <ul className="record-list facility-list">
              {items.map((facility) => (
                <li key={facility.id}>
                  <article className="facility-summary">
                    <h3>
                      <Link href={`/facilities/${facility.slug}`}>{facility.name}</Link>
                    </h3>
                    {facility.type ? <p>{label(facility.type)}</p> : null}
                    {facility.location ? <p>Location: {facility.location}</p> : null}
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p>No published facilities are currently available.</p>
      )}
    </article>
  )
}
