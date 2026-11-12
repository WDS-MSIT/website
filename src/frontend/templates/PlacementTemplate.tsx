import { findSafeHref } from '@/frontend/data/urls'
import type { Document, PlacementYear } from '@/payload-types'
const documentHref = (document: Document) => findSafeHref(document.url || document.legacyUrl)
export function PlacementTemplate({ placement }: { placement: PlacementYear }) {
  const documents = (placement.evidenceDocuments || []).filter(
    (item): item is Document => typeof item === 'object' && Boolean(documentHref(item)),
  )
  return (
    <article className="placement-page">
      <header className="page-header">
        <h1>Placements {placement.year}</h1>
        <p>Status: {placement.placementStatus}</p>
        {placement.statisticsAsOf ? (
          <p>
            Statistics as of{' '}
            <time dateTime={placement.statisticsAsOf}>
              {new Date(placement.statisticsAsOf).toLocaleDateString('en-IN')}
            </time>
          </p>
        ) : null}
      </header>
      {placement.narrativeNotes ? (
        <section aria-labelledby="placement-notes-heading" className="content-section">
          <h2 id="placement-notes-heading">Overview</h2>
          <p>{placement.narrativeNotes}</p>
        </section>
      ) : null}
      <section aria-labelledby="placement-statistics-heading" className="content-section">
        <h2 id="placement-statistics-heading">Statistics</h2>
        <dl>
          {placement.offerCount != null ? (
            <div>
              <dt>Offers</dt>
              <dd>{placement.offerCount}</dd>
            </div>
          ) : null}
          {placement.highestPackageLpa != null ? (
            <div>
              <dt>Highest package</dt>
              <dd>{placement.highestPackageLpa} LPA</dd>
            </div>
          ) : null}
          {placement.medianPackageLpa != null ? (
            <div>
              <dt>Median package</dt>
              <dd>{placement.medianPackageLpa} LPA</dd>
            </div>
          ) : null}
          {placement.averagePackageLpa != null ? (
            <div>
              <dt>Average package</dt>
              <dd>{placement.averagePackageLpa} LPA</dd>
            </div>
          ) : null}
        </dl>
        {placement.statisticsNote ? <p>{placement.statisticsNote}</p> : null}
      </section>
      {documents.length || placement.legacyEvidence?.length ? (
        <section aria-labelledby="placement-evidence-heading" className="content-section">
          <h2 id="placement-evidence-heading">Reports and evidence</h2>
          <ul>
            {documents.map((document) => (
              <li key={document.id}>
                <a href={documentHref(document)}>{document.title}</a>
              </li>
            ))}
            {(placement.legacyEvidence || []).map((item, index) => {
              const href = findSafeHref(item.url)
              return href ? (
                <li key={item.id || index}>
                  <a href={href}>{item.label}</a>
                </li>
              ) : null
            })}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
