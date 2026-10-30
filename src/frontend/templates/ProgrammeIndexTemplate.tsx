import Link from 'next/link'

import type { Programme } from '@/payload-types'

const departmentName = (programme: Programme): string =>
  typeof programme.department === 'object' ? programme.department.name : 'Institute programmes'

export function ProgrammeIndexTemplate({ programmes }: { programmes: Programme[] }) {
  const groups = new Map<string, Programme[]>()

  for (const programme of programmes) {
    const name = departmentName(programme)
    groups.set(name, [...(groups.get(name) || []), programme])
  }

  return (
    <article className="programme-index">
      <header className="page-header">
        <h1>Programmes</h1>
      </header>

      {groups.size ? (
        [...groups.entries()].map(([name, items]) => (
          <section
            aria-labelledby={`programme-group-${items[0].id}`}
            className="content-section"
            key={name}
          >
            <h2 id={`programme-group-${items[0].id}`}>{name}</h2>
            <ul className="record-list programme-list">
              {items.map((programme) => (
                <li key={programme.id}>
                  <article className="programme-summary">
                    <h3>
                      <Link href={`/programmes/${programme.slug}`}>{programme.name}</Link>
                    </h3>
                    <p>{programme.degree}</p>
                    <p>{programme.level}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p>No published programmes are currently available.</p>
      )}
    </article>
  )
}
