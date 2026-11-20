'use client'

/* eslint-disable @next/next/no-img-element */
// NOTE: Logos can be reviewed legacy URLs, so a plain <img> is used, as in CmsImage.

import { ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export type SocietyCard = {
  id: number
  slug: string
  name: string
  category: string
  overview: string
  founded?: number
  logoSrc?: string
}

const ALL = 'All'

// Two-letter mark from the society's name, used where there is no logo (e.g. "IEEE MSIT" -> "IE").
const monogram = (name: string) => {
  const words = name
    .replace(/[()&,'.-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !['MSIT', 'of', 'the', 'and', 'for'].includes(word))
  if (!words.length) return name.slice(0, 2).toUpperCase()
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

// Searchable grid of society cards, ported from the MSIT website's SocietiesHubView.
// Category chips appear only once editors have sorted societies into more than one category.
export function SocietyDirectory({ societies }: { societies: SocietyCard[] }) {
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(societies.map((society) => society.category)))],
    [societies],
  )

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return societies.filter(
      (society) =>
        (category === ALL || society.category === category) &&
        (!q || society.name.toLowerCase().includes(q) || society.overview.toLowerCase().includes(q)),
    )
  }, [societies, category, query])

  const reset = () => {
    setCategory(ALL)
    setQuery('')
  }

  return (
    <section aria-labelledby="society-directory-heading" className="space-y-5 sm:space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900" id="society-directory-heading">
            All societies
          </h2>
          <p aria-live="polite" className="mt-1 text-sm text-slate-600">
            {shown.length} {shown.length === 1 ? 'society' : 'societies'}
            {category !== ALL ? ` in ${category}` : ''}
          </p>
        </div>
        <label className="relative w-full lg:w-80">
          <span className="sr-only">Search societies</span>
          <Search
            aria-hidden="true"
            className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white text-slate-900 placeholder:text-slate-500 rounded-xl text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary transition-shadow"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or topic"
            type="search"
            value={query}
          />
        </label>
      </div>

      {categories.length > 2 ? (
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold whitespace-nowrap ring-1 transition-colors cursor-pointer ${
                category === item
                  ? 'bg-primary text-white ring-primary'
                  : 'bg-white text-slate-700 ring-slate-200 hover:text-primary'
              }`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="grid grid-cols-3 gap-x-2.5 gap-y-3 sm:gap-5">
        {shown.map((society) => (
          <li className="flex" key={society.id}>
            <Link
              className="group w-full bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col ring-1 ring-slate-200/70 hover:ring-primary/40 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] focus-visible:ring-2 focus-visible:ring-primary outline-none transition duration-200 ease-out"
              href={`/societies/${society.slug}`}
            >
              <div
                className={`w-7 h-7 sm:w-12 sm:h-12 rounded-md sm:rounded-xl flex items-center justify-center overflow-hidden shrink-0 ${
                  society.logoSrc
                    ? 'bg-white ring-1 ring-slate-200 p-0.5 sm:p-1'
                    : "bg-slate-100 text-primary font-['Libre_Baskerville',serif] font-bold text-[10px] sm:text-base"
                }`}
              >
                {society.logoSrc ? (
                  <img alt="" className="w-full h-full object-contain" src={society.logoSrc} />
                ) : (
                  <span aria-hidden="true">{monogram(society.name)}</span>
                )}
              </div>

              <h3 className="mt-3 sm:mt-5 font-sans! text-[12.5px] sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2 sm:line-clamp-none group-hover:text-primary transition-colors">
                {society.name}
              </h3>
              {society.overview ? (
                <p className="hidden sm:block mt-3 text-sm text-slate-700 leading-relaxed">
                  {/* line-clamp needs its own element: sm:block would override its display mode. */}
                  <span className="line-clamp-3">{society.overview}</span>
                </p>
              ) : null}

              <div className="mt-auto pt-3 sm:pt-5 flex items-center justify-between gap-1 text-[10px] sm:text-xs text-slate-600">
                <span className="truncate">
                  {society.founded ? `Est. ${society.founded}` : <span className="sm:hidden">View</span>}
                  {society.category !== 'Unclassified' ? (
                    <span className="hidden sm:inline">
                      {society.founded ? ' · ' : ''}
                      {society.category}
                    </span>
                  ) : null}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="hidden sm:block w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!shown.length ? (
        <div className="text-center py-10 sm:py-16 bg-white rounded-2xl px-4 ring-1 ring-slate-200/70">
          <p className="text-sm text-slate-700">No societies match your search.</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={reset}
            type="button"
          >
            Clear search and filters
          </button>
        </div>
      ) : null}
    </section>
  )
}
