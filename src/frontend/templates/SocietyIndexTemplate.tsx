import Link from 'next/link'

import type { Society } from '@/payload-types'

export function SocietyIndexTemplate({ societies }: { societies: Society[] }) {
  return (
    <article className="society-index">
      <header className="page-header">
        <h1>Student societies</h1>
      </header>
      {societies.length ? (
        <ul className="record-list society-list">
          {societies.map((society) => (
            <li key={society.id}>
              <article className="society-summary">
                <h2>
                  <Link href={`/societies/${society.slug}`}>{society.name}</Link>
                </h2>
                <p>{society.category}</p>
                {society.overview ? <p>{society.overview}</p> : null}
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p>No published societies are currently available.</p>
      )}
    </article>
  )
}
