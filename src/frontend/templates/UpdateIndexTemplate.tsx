import Link from 'next/link'
import { Pagination } from '@/frontend/components/Pagination'
import type { Update } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
const date = (value?: null | string) =>
  value ? new Date(value).toLocaleDateString('en-IN', { dateStyle: 'long' }) : undefined
export function UpdateIndexTemplate({
  basePath,
  heading,
  result,
}: {
  basePath: string
  heading: string
  result: PaginatedDocs<Update>
}) {
  return (
    <article className="update-index">
      <header className="page-header">
        <h1>{heading}</h1>
      </header>
      {result.docs.length ? (
        <ol className="record-list update-list">
          {result.docs.map((update) => (
            <li key={update.id}>
              <article className="update-summary">
                <h2>
                  <Link href={`/updates/${update.slug}`}>{update.title}</Link>
                </h2>
                {update.publicationDate ? (
                  <time dateTime={update.publicationDate}>{date(update.publicationDate)}</time>
                ) : null}
                {update.excerpt ? <p>{update.excerpt}</p> : null}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p>No published items are currently available.</p>
      )}
      <Pagination
        basePath={basePath}
        hasNextPage={result.hasNextPage}
        hasPrevPage={result.hasPrevPage}
        page={result.page || 1}
        totalPages={result.totalPages}
      />
    </article>
  )
}
