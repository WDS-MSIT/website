import { CmsImage } from '@/frontend/components/CmsImage'
import { RichTextContent } from '@/frontend/components/RichTextContent'
import { findSafeHref } from '@/frontend/data/urls'
import type { Document, Update } from '@/payload-types'
const documentHref = (document: Document) => findSafeHref(document.url || document.legacyUrl)
export function UpdateTemplate({ update }: { update: Update }) {
  const attachments = (update.attachments || []).filter(
    (item): item is Document => typeof item === 'object' && Boolean(documentHref(item)),
  )
  const externalLink = findSafeHref(update.externalLink)
  return (
    <article className="update-page">
      <header className="page-header">
        <CmsImage alt="" media={update.thumbnail} />
        <p>{update.type}</p>
        <h1>{update.title}</h1>
        {update.publicationDate ? (
          <time dateTime={update.publicationDate}>
            {new Date(update.publicationDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}
          </time>
        ) : null}
        {update.excerpt ? <p>{update.excerpt}</p> : null}
      </header>
      {update.body ? (
        <section aria-labelledby="update-content-heading" className="content-section">
          <h2 id="update-content-heading">Details</h2>
          <RichTextContent data={update.body} />
        </section>
      ) : null}
      {attachments.length || update.legacyAttachments?.length ? (
        <section aria-labelledby="update-attachments-heading" className="content-section">
          <h2 id="update-attachments-heading">Attachments</h2>
          <ul>
            {attachments.map((attachment) => (
              <li key={attachment.id}>
                <a href={documentHref(attachment)}>{attachment.title}</a>
              </li>
            ))}
            {(update.legacyAttachments || []).map((attachment, index) => {
              const href = findSafeHref(attachment.url)
              return href ? (
                <li key={attachment.id || index}>
                  <a href={href}>{attachment.label}</a>
                </li>
              ) : null
            })}
          </ul>
        </section>
      ) : null}
      {externalLink ? (
        <p>
          <a href={externalLink}>Visit the related page</a>
        </p>
      ) : null}
    </article>
  )
}
