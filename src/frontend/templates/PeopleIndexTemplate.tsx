import Link from 'next/link'

import type { Person } from '@/payload-types'

const personTypeLabels: Record<Person['personTypes'][number], string> = {
  administration: 'Administration',
  'committee-member': 'Committee members',
  external: 'External members',
  faculty: 'Faculty',
  governance: 'Governance and advisory',
  leadership: 'Leadership',
  'library-staff': 'Library staff',
  'placement-staff': 'Placement staff',
  'society-member': 'Society members',
  student: 'Students',
  'technical-staff': 'Technical staff',
}

export function PeopleIndexTemplate({ people }: { people: Person[] }) {
  const groups = new Map<Person['personTypes'][number], Person[]>()

  for (const person of people) {
    for (const type of person.personTypes) {
      groups.set(type, [...(groups.get(type) || []), person])
    }
  }

  return (
    <article className="people-index">
      <header className="page-header">
        <h1>People</h1>
      </header>

      {groups.size ? (
        [...groups.entries()].map(([type, items]) => (
          <section aria-labelledby={`people-group-${type}`} className="content-section" key={type}>
            <h2 id={`people-group-${type}`}>{personTypeLabels[type]}</h2>
            <ul className="record-list people-list">
              {items.map((person) => (
                <li key={person.id}>
                  <article className="person-summary">
                    <h3>
                      <Link href={`/people/${person.slug}`}>{person.name}</Link>
                    </h3>
                    {person.primaryDesignation ? <p>{person.primaryDesignation}</p> : null}
                    {person.departments?.length ? (
                      <p>
                        {person.departments
                          .filter((department) => typeof department === 'object')
                          .map((department) =>
                            typeof department === 'object' ? department.name : '',
                          )
                          .join(', ')}
                      </p>
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p>No published people are currently available.</p>
      )}
    </article>
  )
}
