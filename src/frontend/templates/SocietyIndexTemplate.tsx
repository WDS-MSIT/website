import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { KeyFiguresStrip } from '@/frontend/components/site/KeyFiguresStrip'
import { PageHero } from '@/frontend/components/site/PageHero'
import { SocietyDirectory, type SocietyCard } from '@/frontend/components/site/SocietyDirectory'
import { findSafeResourceUrl } from '@/frontend/data/urls'
import type { Society } from '@/payload-types'

export const SOCIETY_CATEGORY_LABELS: Record<Society['category'], string> = {
  unclassified: 'Unclassified',
  academic: 'Academic',
  cultural: 'Cultural',
  service: 'Service',
  technical: 'Technical',
  other: 'Other',
}

export const findSocietyFounded = (society: Society): number | undefined =>
  society.foundedYear || (society.foundedOn ? new Date(society.foundedOn).getFullYear() : undefined)

const toCard = (society: Society): SocietyCard => {
  const logo = findSafeResourceUrl(
    typeof society.logo === 'object' && society.logo ? society.logo.url : undefined,
  )
  const founded = findSocietyFounded(society)
  return {
    id: society.id,
    slug: society.slug,
    name: society.name,
    category: SOCIETY_CATEGORY_LABELS[society.category] || 'Other',
    overview: society.overview || '',
    ...(founded ? { founded } : {}),
    ...(logo ? { logoSrc: logo } : {}),
  }
}

export function SocietyIndexTemplate({ societies }: { societies: Society[] }) {
  // Every figure is counted from the CMS records, so it stays true as editors add societies.
  const faculty = societies.reduce((sum, society) => sum + (society.facultyCoordinators?.length || 0), 0)
  const students = societies.reduce((sum, society) => sum + (society.studentLeaders?.length || 0), 0)
  const figures = [
    { label: 'Active societies', value: String(societies.length) },
    ...(faculty ? [{ label: 'Faculty mentors', value: String(faculty) }] : []),
    ...(students ? [{ label: 'Student leaders', value: String(students) }] : []),
  ]

  return (
    <article className="bg-surface">
      <PageHero
        accentTitle="Societies & Chapters"
        description="Technical innovation, performing arts, research groups and community service. Find your people and build something together."
        heroImage="/campus-hero.webp"
        heroImageAlt="MSIT campus"
        title="Student"
      />
      <KeyFiguresStrip items={figures} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {societies.length ? (
          <SocietyDirectory societies={societies.map(toCard)} />
        ) : (
          <p className="text-slate-700">No published societies are currently available.</p>
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 ring-1 ring-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            <h2 className="font-sans! text-base sm:text-xl font-bold text-slate-900">
              Want to start a new student club or initiative?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Students with a technical idea or a community initiative can send a proposal to the MSIT
              Student Welfare Committee and Faculty Board.
            </p>
          </div>
          <Link
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-colors shrink-0 self-start md:self-auto"
            href="/contact"
          >
            Contact coordinator
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
