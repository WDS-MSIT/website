/* eslint-disable @next/next/no-img-element */
// NOTE: Hero photos are local files in /public, so a plain <img> is enough here.

// Photo banner at the top of a page, ported from the MSIT website's PageHero.
// The shade sits only behind the text so the rest of the photo stays clear.
export function PageHero({
  title,
  accentTitle,
  description,
  heroImage,
  heroImageAlt,
}: {
  title: string
  accentTitle?: string
  description?: string
  heroImage?: string
  heroImageAlt?: string
}) {
  return (
    <div className="bg-slate-950 text-white pt-16 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroImage ? (
          <img
            alt={heroImageAlt || ''}
            className="w-full h-full object-cover contrast-110 saturate-110 select-none"
            src={heroImage}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-title to-slate-950" />
        )}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4 sm:mb-8 drop-shadow-xl">
          {title}
          {accentTitle ? (
            <>
              {' '}
              {/* Primary blue, lifted slightly so it stays readable on the dark photo. */}
              <span className="text-[#5585e0]">{accentTitle}</span>
            </>
          ) : null}
        </h1>
        {description ? (
          <p className="text-slate-200 text-sm sm:text-lg md:text-xl line-clamp-3 sm:line-clamp-none max-w-3xl leading-relaxed font-medium opacity-90 drop-shadow-md">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
