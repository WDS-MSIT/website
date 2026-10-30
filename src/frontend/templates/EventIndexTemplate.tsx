import Link from 'next/link'
import { Pagination } from '@/frontend/components/Pagination'
import type { Event } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
const date = (value?: null | string) =>
  value ? new Date(value).toLocaleDateString('en-IN', { dateStyle: 'long' }) : undefined
export function EventIndexTemplate({ result }: { result: PaginatedDocs<Event> }) {
  return (
    <article className="event-index">
      <header className="page-header">
        <h1>Events</h1>
      </header>
      {result.docs.length ? (
        <ol className="record-list event-list">
          {result.docs.map((event) => (
            <li key={event.id}>
              <article className="event-summary">
                <h2>
                  <Link href={`/events/${event.slug}`}>{event.title}</Link>
                </h2>
                {event.startsAt ? (
                  <time dateTime={event.startsAt}>{date(event.startsAt)}</time>
                ) : null}
                <p>{event.eventStatus}</p>
                {event.summary ? <p>{event.summary}</p> : null}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p>No published events are currently available.</p>
      )}
      <Pagination
        basePath="/events"
        hasNextPage={result.hasNextPage}
        hasPrevPage={result.hasPrevPage}
        page={result.page || 1}
        totalPages={result.totalPages}
      />
    </article>
  )
}
