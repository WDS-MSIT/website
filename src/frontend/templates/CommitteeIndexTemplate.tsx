import Link from 'next/link'

import type { Committee } from '@/payload-types'

export function CommitteeIndexTemplate({
  committees,
  heading = 'Committees',
}: {
  committees: Committee[]
  heading?: string
}) {
  return (
    <article className="committee-index">
      <header className="page-header">
        <h1>{heading}</h1>
      </header>
      {committees.length ? (
        <ul className="record-list committee-list">
          {committees.map((committee) => (
            <li key={committee.id}>
              <Link href={`/committees/${committee.slug}`}>{committee.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No published committees are currently available.</p>
      )}
    </article>
  )
}
