import Link from 'next/link'

export type KeyFigure = {
  label: string
  value: string
  href?: string
}

const COLUMNS: Record<number, string> = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }

// Slim white strip of key figures that sits over the bottom edge of the PageHero, ported from the
// MSIT website. Value above label; a figure with an href links the whole cell.
export function KeyFiguresStrip({ items }: { items: KeyFigure[] }) {
  if (items.length < 2) return null
  const cols = COLUMNS[items.length] || 'grid-cols-2 sm:grid-cols-4'

  return (
    <div className="relative z-10 -mt-6 sm:-mt-8 px-4 sm:px-6">
      <dl
        className={`max-w-7xl mx-auto bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] grid ${cols} divide-x divide-slate-100 p-1 sm:p-2`}
      >
        {items.map((item) => {
          const cell =
            'flex flex-col items-center sm:items-start text-center sm:text-left px-1 py-2.5 sm:px-6 sm:py-5'
          const body = (
            <>
              <dd className="font-['Libre_Baskerville',serif] text-[13px] min-[400px]:text-base sm:text-2xl md:text-3xl font-bold text-primary tabular-nums leading-none whitespace-nowrap">
                {item.value}
              </dd>
              <dt className="order-first sm:order-none mb-1 sm:mb-0 sm:mt-2 text-[8.5px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-wider text-slate-600 leading-tight">
                {item.label}
              </dt>
            </>
          )
          if (!item.href) {
            return (
              <div className={cell} key={item.label}>
                {body}
              </div>
            )
          }
          // dt/dd must stay direct children of the cell, so the link covers the cell instead of wrapping it.
          return (
            <div className={`${cell} relative rounded-xl hover:bg-surface transition-colors`} key={item.label}>
              {body}
              <Link
                aria-label={`${item.value} ${item.label}`}
                className="absolute inset-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                href={item.href}
              />
            </div>
          )
        })}
      </dl>
    </div>
  )
}
