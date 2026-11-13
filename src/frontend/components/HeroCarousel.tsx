'use client'

import { useEffect, useMemo, useState } from 'react'

import { CmsImage } from '@/frontend/components/CmsImage'
import { CmsLink } from '@/frontend/components/CmsLink'
import type { Homepage } from '@/payload-types'

type HeroSlide = NonNullable<Homepage['heroSlides']>[number]

const desktopSlidesPerPage = 7
const mobileSlidesPerPage = 4

const paginate = (slides: HeroSlide[], pageSize: number): HeroSlide[][] => {
  const pages: HeroSlide[][] = []

  for (let index = 0; index < slides.length; index += pageSize) {
    pages.push(slides.slice(index, index + pageSize))
  }

  return pages
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [pageSize, setPageSize] = useState(desktopSlidesPerPage)
  const pages = useMemo(() => paginate(slides, pageSize), [pageSize, slides])
  const [currentPage, setCurrentPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 48rem)')
    const updatePageSize = () => {
      setPageSize(mediaQuery.matches ? mobileSlidesPerPage : desktopSlidesPerPage)
    }

    updatePageSize()
    mediaQuery.addEventListener('change', updatePageSize)

    return () => mediaQuery.removeEventListener('change', updatePageSize)
  }, [])

  useEffect(() => {
    if (
      pages.length < 2 ||
      paused ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const timer = window.setInterval(() => {
      setCurrentPage((page) => (page + 1) % pages.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [pages.length, paused])

  const activePage = currentPage % pages.length
  const selectPage = (page: number) => setCurrentPage((page + pages.length) % pages.length)

  return (
    <section
      aria-labelledby="homepage-highlights-heading"
      className="hero-highlights"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h1 className="visually-hidden" id="homepage-highlights-heading">
        Campus highlights
      </h1>

      <div className="hero-carousel-window">
        <div
          className="hero-carousel-track"
          style={{ transform: `translateX(-${activePage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <ol
              aria-hidden={pageIndex !== activePage}
              className="hero-list"
              inert={pageIndex !== activePage}
              key={`hero-page-${pageIndex}`}
            >
              {page.map((slide, index) => (
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
          ))}
        </div>
      </div>

      {pages.length > 1 ? (
        <div className="hero-carousel-controls">
          <button
            aria-label="Previous campus highlights"
            onClick={() => selectPage(activePage - 1)}
          >
            ←
          </button>
          <p aria-live="polite">
            {activePage + 1} / {pages.length}
          </p>
          <div className="hero-carousel-pages">
            {pages.map((_, pageIndex) => (
              <button
                aria-label={`Show campus highlights page ${pageIndex + 1}`}
                aria-pressed={pageIndex === activePage}
                key={`hero-control-${pageIndex}`}
                onClick={() => selectPage(pageIndex)}
              />
            ))}
          </div>
          <button aria-label="Next campus highlights" onClick={() => selectPage(activePage + 1)}>
            →
          </button>
        </div>
      ) : null}
    </section>
  )
}
