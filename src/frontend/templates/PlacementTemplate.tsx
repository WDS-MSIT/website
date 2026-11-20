import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'

import { KeyFiguresStrip } from '@/frontend/components/site/KeyFiguresStrip'
import { PageHero } from '@/frontend/components/site/PageHero'
import { findPlacementEvidence, findPlacementFigures } from '@/frontend/templates/PlacementIndexTemplate'
import type { PlacementYear } from '@/payload-types'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: 'Asia/Kolkata' }).format(new Date(value))

const cardTitle = 'font-sans! text-lg sm:text-2xl font-bold text-slate-900 mb-4'

export function PlacementTemplate({ placement }: { placement: PlacementYear }) {
  const evidence = findPlacementEvidence(placement)
  const status = placement.placementStatus === 'ongoing' ? 'Placement season in progress' : 'Final results'
  const asOf = placement.statisticsAsOf ? `, as of ${formatDate(placement.statisticsAsOf)}` : ''

  return (
    <article className="bg-surface pb-12 sm:pb-20">
      <PageHero
        accentTitle={String(placement.year)}
        description={`${status}${asOf}.`}
        heroImage="/campus/conference-room.jpg"
        heroImageAlt="MSIT conference room"
        title="Placements"
      />
      <KeyFiguresStrip items={findPlacementFigures(placement)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 space-y-6 sm:space-y-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
          href="/placements"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
          All placement years
        </Link>

        {placement.narrativeNotes || placement.statisticsNote ? (
          <section aria-labelledby="placement-notes-heading" className="bg-white rounded-2xl ring-1 ring-slate-200/70 p-5 sm:p-8">
            <h2 className={cardTitle} id="placement-notes-heading">
              Overview
            </h2>
            {placement.narrativeNotes ? (
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{placement.narrativeNotes}</p>
            ) : null}
            {placement.statisticsNote ? (
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{placement.statisticsNote}</p>
            ) : null}
          </section>
        ) : null}

        {evidence.length ? (
          <section aria-labelledby="placement-evidence-heading" className="bg-white rounded-2xl ring-1 ring-slate-200/70 p-5 sm:p-8">
            <h2 className={cardTitle} id="placement-evidence-heading">
              Reports
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
              {evidence.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <a
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 bg-surface ring-1 ring-slate-200/70 hover:ring-primary/40 hover:text-primary transition-colors"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FileText aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                    <span className="min-w-0 break-words">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  )
}
