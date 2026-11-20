/* eslint-disable @next/next/no-img-element */
// NOTE: Recruiter logos are local files in /public, so a plain <img> is enough here.

import { ArrowRight, Building2, FileText } from 'lucide-react'
import Link from 'next/link'

import { KeyFiguresStrip, type KeyFigure } from '@/frontend/components/site/KeyFiguresStrip'
import { PageHero } from '@/frontend/components/site/PageHero'
import { findSafeHref } from '@/frontend/data/urls'
import type { Document, PlacementYear } from '@/payload-types'

// Recruiter logos are part of the design (the CMS has no field for them), as in the MSIT website.
const RECRUITERS = [
  { name: 'Google', category: 'Product', logo: '/logos/recruiters/google.svg' },
  { name: 'Microsoft', category: 'Product', logo: '/logos/recruiters/microsoft.svg' },
  { name: 'Amazon', category: 'Product', logo: '/logos/recruiters/amazon.svg' },
  { name: 'Adobe', category: 'Product', logo: '/logos/recruiters/adobe.svg' },
  { name: 'Samsung R&D', category: 'Product', logo: '/logos/recruiters/samsung.svg' },
  { name: 'Postman', category: 'Product', logo: '/logos/recruiters/postman.svg' },
  { name: 'ZS Associates', category: 'Consulting', logo: '/logos/recruiters/zs.svg' },
  { name: 'ION Trading', category: 'Fintech', logo: '/logos/recruiters/ion.png' },
  { name: 'Josh Technologies', category: 'Product', logo: '/logos/recruiters/josh-technology-group.png' },
  { name: 'TCS', category: 'Services', logo: '/logos/recruiters/tcs.svg' },
  { name: 'Infosys', category: 'Services', logo: '/logos/recruiters/infosys.svg' },
  { name: 'Wipro', category: 'Services', logo: '/logos/recruiters/wipro.svg' },
  { name: 'Accenture', category: 'Services', logo: '/logos/recruiters/accenture.svg' },
  { name: 'Cognizant', category: 'Services', logo: '/logos/recruiters/cognizant.svg' },
  { name: 'IBM', category: 'Services', logo: '/logos/recruiters/ibm.svg' },
]

const lpa = (value?: null | number) => (value != null ? `${value} LPA` : undefined)

// Key figures for one placement year, in the order the strip shows them.
export const findPlacementFigures = (year: PlacementYear): KeyFigure[] =>
  [
    { label: 'Offers', value: year.offerCount != null ? year.offerCount.toLocaleString('en-IN') : undefined },
    { label: 'Highest package', value: lpa(year.highestPackageLpa) },
    { label: 'Median package', value: lpa(year.medianPackageLpa) },
    { label: 'Average package', value: lpa(year.averagePackageLpa) },
  ].filter((figure): figure is KeyFigure => Boolean(figure.value))

export const findPlacementEvidence = (year: PlacementYear) =>
  [
    ...(year.evidenceDocuments || [])
      .filter((item): item is Document => typeof item === 'object')
      .map((item) => ({ label: item.title, href: findSafeHref(item.url || item.legacyUrl) })),
    ...(year.legacyEvidence || []).map((item) => ({ label: item.label, href: findSafeHref(item.url) })),
  ].filter((item): item is { label: string; href: string } => Boolean(item.href))

export function PlacementIndexTemplate({ years }: { years: PlacementYear[] }) {
  // The strip shows the most recent year that has figures.
  const latest = years.find((year) => findPlacementFigures(year).length >= 2)
  const figures = latest
    ? findPlacementFigures(latest).map((figure) => ({ ...figure, label: `${figure.label} ${latest.year}` }))
    : []

  return (
    <article className="bg-surface pb-12 sm:pb-20">
      <PageHero
        accentTitle="Placement Records"
        description="Year-by-year placement results at MSIT, with the official reports behind every number."
        heroImage="/campus/conference-room.jpg"
        heroImageAlt="MSIT conference room"
        title="Careers &"
      />
      <KeyFiguresStrip items={figures} />

      <section aria-labelledby="recruiters-heading" className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-10">
            <Building2 aria-hidden="true" className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" id="recruiters-heading">
              Companies recruiting at MSIT
            </h2>
          </div>
          <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
            {RECRUITERS.map((company) => (
              <li
                className="bg-white p-2 sm:p-5 rounded-xl sm:rounded-2xl ring-1 ring-slate-200/80 flex flex-col items-center justify-between text-center min-h-[96px] sm:min-h-[145px]"
                key={company.name}
              >
                <div className="h-10 sm:h-14 w-full flex items-center justify-center p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-surface">
                  <img
                    alt={`${company.name} logo`}
                    className="max-h-7 sm:max-h-10 max-w-[85%] sm:max-w-[120px] object-contain"
                    loading="lazy"
                    src={company.logo}
                  />
                </div>
                <div className="w-full pt-2">
                  <span className="block text-[9px] sm:text-xs font-extrabold text-slate-800 uppercase tracking-wide sm:tracking-wider leading-tight">
                    {company.name}
                  </span>
                  <span className="block mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] text-slate-500 font-bold tracking-wider sm:tracking-widest uppercase">
                    {company.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="placement-years-heading" className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2" id="placement-years-heading">
          Year-by-year results
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-8">
          Open a year for its full statistics and the official placement reports.
        </p>
        {years.length ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {years.map((year) => {
              const reports = findPlacementEvidence(year).length
              return (
                <li className="flex" key={year.id}>
                  <Link
                    className="group w-full bg-white rounded-xl sm:rounded-2xl ring-1 ring-slate-200/70 p-3 sm:p-5 flex flex-col hover:ring-primary/40 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] focus-visible:ring-2 focus-visible:ring-primary outline-none transition duration-200"
                    href={`/placements/${year.year}`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-['Libre_Baskerville',serif] text-xl sm:text-3xl font-bold text-primary tabular-nums">
                        {year.year}
                      </span>
                      {year.placementStatus === 'ongoing' ? (
                        <span className="text-[9px] sm:text-xs font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                          Ongoing
                        </span>
                      ) : null}
                    </div>
                    <dl className="mt-3 space-y-1 text-[11px] sm:text-sm">
                      {year.offerCount != null ? (
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-600">Offers</dt>
                          <dd className="font-semibold text-slate-900 tabular-nums">{year.offerCount}</dd>
                        </div>
                      ) : null}
                      {year.highestPackageLpa != null ? (
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-600">Highest</dt>
                          <dd className="font-semibold text-slate-900 tabular-nums">{lpa(year.highestPackageLpa)}</dd>
                        </div>
                      ) : null}
                      {year.averagePackageLpa != null ? (
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-600">Average</dt>
                          <dd className="font-semibold text-slate-900 tabular-nums">{lpa(year.averagePackageLpa)}</dd>
                        </div>
                      ) : null}
                    </dl>
                    <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between text-[10px] sm:text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        {reports ? (
                          <>
                            <FileText aria-hidden="true" className="w-3.5 h-3.5" />
                            {reports} {reports === 1 ? 'report' : 'reports'}
                          </>
                        ) : (
                          'View year'
                        )}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-slate-700">No published placement years are currently available.</p>
        )}
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16">
        <Link
          className="flex items-center justify-between gap-4 bg-white rounded-2xl ring-1 ring-slate-200/70 p-5 sm:p-8 hover:ring-primary/40 transition-colors group"
          href="/placements/internship-cell"
        >
          <span>
            <span className="block text-base sm:text-xl font-bold text-slate-900">
              Industry-Institute Interaction Cell &amp; Internship Cell
            </span>
            <span className="block mt-1 text-sm text-slate-700">
              Internships, industry visits and the Cell&apos;s team.
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="w-5 h-5 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
    </article>
  )
}
