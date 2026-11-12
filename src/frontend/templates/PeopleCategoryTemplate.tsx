import Link from 'next/link'

import type { Person } from '@/payload-types'

export function PeopleCategoryTemplate({ heading, people }: { heading: string; people: Person[] }) {
  return (
    <article className="people-category">
      <header className="page-header">
        <h1>{heading}</h1>
      </header>
      {people.length ? (
        <ul className="record-list people-list">
          {people.map((person) => (
            <li key={person.id}>
              <article className="person-summary">
                <h2>
                  <Link href={`/people/${person.slug}`}>{person.name}</Link>
                </h2>
                {person.primaryDesignation ? <p>{person.primaryDesignation}</p> : null}
                {person.biography ? <p>{person.biography}</p> : null}
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p>No published people are currently available in this category.</p>
      )}
    </article>
  )
}
