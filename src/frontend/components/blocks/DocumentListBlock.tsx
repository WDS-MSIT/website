import { findSafeHref } from '@/frontend/data/urls'
import type { DocumentListBlock as DocumentListBlockData } from '@/payload-types'

export function DocumentListBlock({ block }: { block: DocumentListBlockData }) {
  const documents = (block.documents || []).filter(
    (document) =>
      typeof document === 'object' && Boolean(findSafeHref(document.url || document.legacyUrl)),
  )
  const legacyDocuments = (block.legacyDocuments || []).filter((document) =>
    Boolean(findSafeHref(document.url)),
  )

  if (!documents.length && !legacyDocuments.length) return null

  return (
    <section className="document-list">
      {block.heading ? <h2>{block.heading}</h2> : null}
      <ul>
        {documents.map((document) => {
          if (typeof document === 'number') return null

          return (
            <li key={document.id}>
              <a href={findSafeHref(document.url || document.legacyUrl)}>{document.title}</a>
              {document.description ? <p>{document.description}</p> : null}
            </li>
          )
        })}
        {legacyDocuments.map((document, index) => (
          <li key={document.id || `${document.url}-${index}`}>
            <a href={findSafeHref(document.url)}>{document.label}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
