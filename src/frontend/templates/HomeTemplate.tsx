import { CmsImage } from '@/frontend/components/CmsImage'
import { CmsLink } from '@/frontend/components/CmsLink'
import { findSafeHref, findSafeResourceUrl } from '@/frontend/data/urls'
import type { Homepage, Update } from '@/payload-types'
import type { HomepageUpdateSection } from '@/frontend/types'

const updateHref = (update: Update): string => `/updates/${update.slug}`

const formatDate = (value: null | string | undefined): string | undefined => {
  if (!value) return undefined

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'long',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(value))
}

export function HomeTemplate({
  homepage,
  updateSections,
}: {
  homepage: Homepage
  updateSections: HomepageUpdateSection[]
}) {
  const campusTourUrl = findSafeResourceUrl(homepage.campusTour?.videoUrl)

  return (
    <article className="homepage">
      <header className="page-header">
        <h1>{homepage.heading}</h1>
      </header>

      {homepage.heroSlides?.length ? (
        <section aria-labelledby="homepage-highlights-heading" className="hero-highlights">
          <h2 id="homepage-highlights-heading">Highlights</h2>
          <ol className="hero-list">
            {homepage.heroSlides.map((slide, index) => (
              <li key={slide.id || `${slide.caption}-${index}`}>
                <CmsLink link={slide}>
                  <figure>
                    <CmsImage
                      alt={slide.caption}
                      className="hero-image"
                      legacyUrl={slide.legacyImageUrl}
                      media={slide.image}
                    />
                    <figcaption>{slide.caption}</figcaption>
                  </figure>
                </CmsLink>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {updateSections.map((section, sectionIndex) => (
        <section
          aria-labelledby={`homepage-update-section-${sectionIndex}`}
          className="update-section"
          key={`${section.heading}-${sectionIndex}`}
        >
          <h2 id={`homepage-update-section-${sectionIndex}`}>{section.heading}</h2>
          {section.updates.length ? (
            <ol className="record-list update-list">
              {section.updates.map((update) => {
                const publicationDate = formatDate(update.publicationDate)

                return (
                  <li key={update.id}>
                    <article className="update-summary">
                      <h3>
                        <a href={updateHref(update)}>{update.title}</a>
                      </h3>
                      {publicationDate ? (
                        <time dateTime={update.publicationDate || undefined}>
                          {publicationDate}
                        </time>
                      ) : null}
                      {update.excerpt ? <p>{update.excerpt}</p> : null}
                    </article>
                  </li>
                )
              })}
            </ol>
          ) : (
            <p>No published items are currently available.</p>
          )}
          {findSafeHref(section.viewAllPath) ? (
            <a href={findSafeHref(section.viewAllPath)}>View all</a>
          ) : null}
        </section>
      ))}

      {homepage.campusTour?.heading ||
      homepage.campusTour?.videoUrl ||
      homepage.campusTour?.gallery?.length ? (
        <section aria-labelledby="campus-tour-heading" className="campus-tour">
          <h2 id="campus-tour-heading">{homepage.campusTour.heading || 'Campus tour'}</h2>
          {campusTourUrl ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              src={campusTourUrl}
              title={homepage.campusTour.heading || 'MSIT campus tour'}
            />
          ) : null}
          {homepage.campusTour.gallery?.length ? (
            <ul className="campus-gallery">
              {homepage.campusTour.gallery.map((item, index) => (
                <li key={item.id || `campus-image-${index}`}>
                  <figure>
                    <CmsImage
                      alt={item.caption || `MSIT campus view ${index + 1}`}
                      legacyUrl={item.legacyImageUrl}
                      media={item.image}
                    />
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
    </article>
  )
}
