import { CmsImage } from '@/frontend/components/CmsImage'
import { HeroCarousel } from '@/frontend/components/HeroCarousel'
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
      {homepage.heroSlides?.length ? <HeroCarousel slides={homepage.heroSlides} /> : null}

      <div className="homepage-updates">
        {updateSections.map((section, sectionIndex) => {
          const viewAllHref = findSafeHref(section.viewAllPath)

          return (
            <section
              aria-labelledby={`homepage-update-section-${sectionIndex}`}
              className="update-section"
              key={`${section.heading}-${sectionIndex}`}
            >
              <header className="update-section-header">
                <h2 id={`homepage-update-section-${sectionIndex}`}>{section.heading}</h2>
                {viewAllHref ? <a href={viewAllHref}>View all</a> : null}
              </header>
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
            </section>
          )
        })}
      </div>

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
