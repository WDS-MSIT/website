import Link from 'next/link'
import { CmsImage } from '@/frontend/components/CmsImage'
import { RichTextContent } from '@/frontend/components/RichTextContent'
import { findSafeHref } from '@/frontend/data/urls'
import type { Document, Event } from '@/payload-types'
const documentHref = (document: Document) => findSafeHref(document.url || document.legacyUrl)
const date = (value: string) =>
  new Date(value).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })
export function EventTemplate({ event }: { event: Event }) {
  const reports = (event.reports || []).filter(
    (item): item is Document => typeof item === 'object' && Boolean(documentHref(item)),
  )
  const registrationUrl = findSafeHref(event.registrationUrl)
  return (
    <article className="event-page">
      <header className="page-header">
        <h1>{event.title}</h1>
        {event.summary ? <p>{event.summary}</p> : null}
        <dl>
          <div>
            <dt>Status</dt>
            <dd>{event.eventStatus}</dd>
          </div>
          {event.startsAt ? (
            <div>
              <dt>Starts</dt>
              <dd>
                <time dateTime={event.startsAt}>{date(event.startsAt)}</time>
              </dd>
            </div>
          ) : null}
          {event.endsAt ? (
            <div>
              <dt>Ends</dt>
              <dd>
                <time dateTime={event.endsAt}>{date(event.endsAt)}</time>
              </dd>
            </div>
          ) : null}
          <div>
            <dt>Delivery</dt>
            <dd>{event.deliveryMode}</dd>
          </div>
          {event.venue ? (
            <div>
              <dt>Venue</dt>
              <dd>{event.venue}</dd>
            </div>
          ) : null}
        </dl>
        {registrationUrl ? (
          <p>
            <a href={registrationUrl}>Register or visit the official event page</a>
          </p>
        ) : null}
      </header>
      {event.body ? (
        <section aria-labelledby="event-details-heading" className="content-section">
          <h2 id="event-details-heading">Event details</h2>
          <RichTextContent data={event.body} />
        </section>
      ) : null}
      {event.departments?.length || event.societies?.length || event.organisers?.length ? (
        <section aria-labelledby="event-organisers-heading" className="content-section">
          <h2 id="event-organisers-heading">Organisers</h2>
          <ul>
            {(event.departments || []).map((item) =>
              typeof item === 'object' ? (
                <li key={`department-${item.id}`}>
                  <Link href={`/departments/${item.slug}`}>{item.name}</Link>
                </li>
              ) : null,
            )}
            {(event.societies || []).map((item) =>
              typeof item === 'object' ? (
                <li key={`society-${item.id}`}>
                  <Link href={`/societies/${item.slug}`}>{item.name}</Link>
                </li>
              ) : null,
            )}
            {(event.organisers || []).map((item, index) => (
              <li key={item.id || index}>{item.name}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {reports.length || event.legacyReports?.length ? (
        <section aria-labelledby="event-reports-heading" className="content-section">
          <h2 id="event-reports-heading">Reports</h2>
          <ul>
            {reports.map((report) => (
              <li key={report.id}>
                <a href={documentHref(report)}>{report.title}</a>
              </li>
            ))}
            {(event.legacyReports || []).map((report, index) => {
              const href = findSafeHref(report.url)
              return href ? (
                <li key={report.id || index}>
                  <a href={href}>{report.label}</a>
                </li>
              ) : null
            })}
          </ul>
        </section>
      ) : null}
      {event.gallery?.length || event.legacyImages?.length ? (
        <section aria-labelledby="event-gallery-heading" className="content-section">
          <h2 id="event-gallery-heading">Gallery</h2>
          <ul className="media-gallery">
            {(event.gallery || []).map((item, index) => (
              <li key={item.id || index}>
                <figure>
                  <CmsImage alt={item.caption || event.title} media={item.image} />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
            {(event.legacyImages || []).map((item, index) => (
              <li key={item.id || index}>
                <CmsImage alt={`${event.title} image ${index + 1}`} legacyUrl={item.url} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
