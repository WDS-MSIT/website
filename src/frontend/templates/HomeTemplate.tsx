import { ArrowRight, Bell, CalendarDays, GraduationCap } from 'lucide-react'
import Link from 'next/link'

import { CmsImage } from '@/frontend/components/CmsImage'
import { CmsLink, findLinkHref } from '@/frontend/components/CmsLink'
import { findSafeHref, findSafeResourceUrl } from '@/frontend/data/urls'
import type { HomepageUpdateSection } from '@/frontend/types'
import type { Homepage, Programme, SiteSetting, Update } from '@/payload-types'

type Announcement = NonNullable<SiteSetting['announcements']>[number]

const DEFAULT_HEADING = 'Maharaja Surajmal Institute of Technology'
const container = 'max-w-7xl mx-auto px-4 sm:px-6'
const sectionTitle = 'text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight'

const updateHref = (update: Update): string => `/updates/${update.slug}`

const formatDate = (value: null | string | undefined): string | undefined =>
  value
    ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(value))
    : undefined

export function HomeTemplate({
  announcements,
  homepage,
  programmes,
  updateSections,
}: {
  announcements: Announcement[]
  homepage: Homepage
  programmes: Programme[]
  updateSections: HomepageUpdateSection[]
}) {
  const slides = homepage.heroSlides || []
  const heroSlide = slides[0]
  const heroImage =
    findSafeResourceUrl(
      heroSlide && typeof heroSlide.image === 'object' && heroSlide.image ? heroSlide.image.url : heroSlide?.legacyImageUrl,
    ) || '/campus-hero.webp'
  const campusTourUrl = findSafeResourceUrl(homepage.campusTour?.videoUrl)
  const gallery = homepage.campusTour?.gallery || []

  return (
    <article className="bg-surface">
      {/* Hero */}
      <section className="relative w-full min-h-[clamp(480px,78vh,720px)] flex items-end bg-slate-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- hero can be a reviewed legacy URL, as in CmsImage */}
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={heroImage} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10" />
        <div className={`${container} relative z-10 w-full pb-12 sm:pb-20`}>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-300 mb-3 sm:mb-5">
            Affiliated to GGSIPU · New Delhi
          </p>
          <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl">
            {homepage.heading || DEFAULT_HEADING}
          </h1>
          {heroSlide?.caption ? (
            <p className="mt-4 sm:mt-6 text-slate-200 text-sm sm:text-xl max-w-2xl leading-relaxed">{heroSlide.caption}</p>
          ) : null}
          <div className="mt-6 sm:mt-10 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
              href="/programmes"
            >
              Explore programmes
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
            <a
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/30 text-white text-sm font-semibold transition-colors"
              href="https://ipu.admissions.nic.in/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Admissions
            </a>
          </div>
        </div>
      </section>

      {/* Announcements from Site Settings */}
      {announcements.length ? (
        <section aria-label="Announcements" className="bg-white border-b border-slate-200">
          <div className={`${container} flex items-center gap-3 sm:gap-4 py-3`}>
            <span className="inline-flex items-center gap-1.5 shrink-0 text-xs font-bold uppercase tracking-wider text-primary">
              <Bell aria-hidden="true" className="w-4 h-4" />
              <span className="hidden sm:inline">Notices</span>
            </span>
            <ul className="flex gap-6 overflow-x-auto scrollbar-hide text-sm text-slate-700 whitespace-nowrap">
              {announcements.map((item, index) => {
                const href = findLinkHref(item)
                return (
                  <li key={item.id || index}>
                    {href ? (
                      <CmsLink className="hover:text-primary transition-colors" link={item}>
                        {item.message}
                      </CmsLink>
                    ) : (
                      item.message
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Highlights: the remaining hero slides */}
      {slides.length > 1 ? (
        <section aria-labelledby="home-highlights-heading" className={`${container} pt-12 sm:pt-20`}>
          <h2 className={sectionTitle} id="home-highlights-heading">
            Highlights
          </h2>
          <ul className="mt-6 sm:mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {slides.slice(1).map((slide, index) => (
              <li className="group bg-white rounded-xl sm:rounded-2xl ring-1 ring-slate-200/70 overflow-hidden" key={slide.id || index}>
                <CmsLink className="block h-full" link={slide}>
                  <CmsImage
                    alt={slide.caption}
                    className="w-full aspect-[4/3] object-cover"
                    legacyUrl={slide.legacyImageUrl}
                    media={slide.image}
                  />
                  <p className="p-3 sm:p-5 text-[12px] sm:text-base font-semibold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                    {slide.caption}
                  </p>
                </CmsLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* News, notices and achievements */}
      {updateSections.length ? (
        <section aria-labelledby="home-news-heading" className={`${container} pt-12 sm:pt-20`}>
          <h2 className={sectionTitle} id="home-news-heading">
            News &amp; notices
          </h2>
          <div className={`mt-6 sm:mt-10 grid gap-5 sm:gap-6 ${updateSections.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {updateSections.map((section, sectionIndex) => {
              const viewAll = findSafeHref(section.viewAllPath)
              return (
                <section
                  aria-labelledby={`home-update-section-${sectionIndex}`}
                  className="bg-white rounded-2xl ring-1 ring-slate-200/70 p-5 sm:p-7 flex flex-col"
                  key={`${section.heading}-${sectionIndex}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="font-sans! text-lg sm:text-xl font-bold text-slate-900" id={`home-update-section-${sectionIndex}`}>
                      {section.heading}
                    </h3>
                    {viewAll ? (
                      <Link className="text-sm font-semibold text-primary hover:text-primary-dark shrink-0" href={viewAll}>
                        View all
                      </Link>
                    ) : null}
                  </div>
                  {section.updates.length ? (
                    <ol className="divide-y divide-slate-100">
                      {section.updates.map((update) => {
                        const date = formatDate(update.publicationDate)
                        return (
                          <li className="py-3 first:pt-0 last:pb-0" key={update.id}>
                            <Link className="group block" href={updateHref(update)}>
                              {date ? (
                                <time
                                  className="inline-flex items-center gap-1.5 text-xs text-slate-500"
                                  dateTime={update.publicationDate || undefined}
                                >
                                  <CalendarDays aria-hidden="true" className="w-3.5 h-3.5" />
                                  {date}
                                </time>
                              ) : null}
                              <span className="block mt-0.5 text-sm sm:text-base font-semibold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                                {update.title}
                              </span>
                              {update.excerpt ? (
                                <span className="mt-1 text-sm text-slate-600 line-clamp-2">{update.excerpt}</span>
                              ) : null}
                            </Link>
                          </li>
                        )
                      })}
                    </ol>
                  ) : (
                    <p className="text-sm text-slate-600">No published items yet.</p>
                  )}
                </section>
              )
            })}
          </div>
        </section>
      ) : null}

      {/* Programmes from the Programmes collection */}
      {programmes.length ? (
        <section aria-labelledby="home-programmes-heading" className={`${container} pt-12 sm:pt-20`}>
          <div className="flex items-end justify-between gap-4">
            <h2 className={sectionTitle} id="home-programmes-heading">
              Academic programmes
            </h2>
            <Link className="text-sm font-semibold text-primary hover:text-primary-dark shrink-0" href="/programmes">
              All programmes
            </Link>
          </div>
          <ul className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-5">
            {programmes.map((programme) => {
              const department = typeof programme.department === 'object' ? programme.department : undefined
              return (
                <li className="flex" key={programme.id}>
                  <Link
                    className="group w-full bg-white rounded-xl sm:rounded-2xl ring-1 ring-slate-200/70 p-4 sm:p-7 flex flex-col hover:ring-primary/40 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] transition duration-200"
                    href={`/programmes/${programme.slug}`}
                  >
                    <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                      <GraduationCap aria-hidden="true" className="w-4 h-4" />
                      {programme.degree}
                      {programme.durationYears ? ` · ${programme.durationYears} years` : ''}
                    </span>
                    <span className="mt-2 sm:mt-3 text-[13px] sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                      {programme.name}
                    </span>
                    {department ? (
                      <span className="mt-1 text-[11px] sm:text-sm text-slate-600">{department.name}</span>
                    ) : null}
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-auto pt-3 w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}

      {/* Campus tour */}
      {homepage.campusTour?.heading || campusTourUrl || gallery.length ? (
        <section aria-labelledby="home-campus-heading" className={`${container} py-12 sm:py-20`}>
          <h2 className={sectionTitle} id="home-campus-heading">
            {homepage.campusTour?.heading || 'Campus tour'}
          </h2>
          {campusTourUrl ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mt-6 sm:mt-10 w-full aspect-video rounded-2xl ring-1 ring-slate-200/70 bg-slate-900"
              loading="lazy"
              src={campusTourUrl}
              title={homepage.campusTour?.heading || 'MSIT campus tour'}
            />
          ) : null}
          {gallery.length ? (
            <ul className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
              {gallery.map((item, index) => (
                <li key={item.id || index}>
                  <figure>
                    <CmsImage
                      alt={item.caption || `MSIT campus view ${index + 1}`}
                      className="w-full aspect-[4/3] object-cover rounded-xl ring-1 ring-slate-200/70"
                      legacyUrl={item.legacyImageUrl}
                      media={item.image}
                    />
                    {item.caption ? <figcaption className="mt-1.5 text-xs text-slate-600">{item.caption}</figcaption> : null}
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : (
        <div className="pb-12 sm:pb-20" />
      )}
    </article>
  )
}
