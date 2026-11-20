'use client'

/* eslint-disable @next/next/no-img-element */
// NOTE: The logo can be a reviewed legacy URL from Site Settings, so a plain <img> is used, as in CmsImage.

import { ArrowRight, ChevronDown, House } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { SiteLink } from '@/frontend/components/site/SiteLink'
import type { NavGroup, NavLink, SiteChrome } from '@/frontend/data/site-navigation'

// TODO: Port site search and the accessibility panel once their data lives in the CMS.
// TODO: Restore the transparent header over the homepage hero once the homepage is ported.

const linkMatches = (link: NavLink, path: string): boolean =>
  (!link.external && link.href === path) ||
  Boolean(link.children?.some((child) => linkMatches(child, path)))

const groupIsActive = (group: NavGroup, path: string) =>
  group.links.some((link) => linkMatches(link, path))

// One dropdown entry; an entry with children opens a nested list on hover.
function DropdownItem({ link, path, onNavigate }: { link: NavLink; path: string; onNavigate: () => void }) {
  if (link.children?.length) {
    const childActive = link.children.some((child) => linkMatches(child, path))
    return (
      <div className="group/sub w-full py-1 flex flex-col">
        <div className="flex items-center justify-between w-full py-1 cursor-pointer text-slate-600 hover:text-primary transition-colors">
          <span className={childActive ? 'text-primary font-bold text-sm' : 'font-semibold text-sm'}>
            {link.label}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-4 h-4 transition-transform duration-300 delay-200 group-hover/sub:rotate-180 ${
              childActive ? 'text-primary' : 'text-slate-400 group-hover/sub:text-primary'
            }`}
          />
        </div>
        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 delay-200 group-hover/sub:max-h-60 group-hover/sub:opacity-100 group-hover/sub:mt-1 group-hover/sub:mb-2 group-focus-within/sub:max-h-60 group-focus-within/sub:opacity-100 pl-4 border-l-2 border-slate-100/80 flex flex-col space-y-2.5">
          {link.children.map((child) => (
            <DropdownItem key={`${child.label}-${child.href}`} link={child} onNavigate={onNavigate} path={path} />
          ))}
        </div>
      </div>
    )
  }

  const active = linkMatches(link, path)
  return (
    <SiteLink
      className={`text-sm transition-all flex items-center justify-between group/link py-1 ${
        active ? 'text-primary font-bold' : 'font-semibold text-slate-600 hover:text-primary'
      }`}
      link={link}
      onClick={onNavigate}
    >
      <span>{link.label}</span>
      <ArrowRight
        aria-hidden="true"
        className={`w-3.5 h-3.5 transition-all shrink-0 text-primary ${
          active
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0'
        }`}
      />
    </SiteLink>
  )
}

// One entry in the phone menu; an entry with children toggles a nested list.
function MobileItem({ link, path, onNavigate }: { link: NavLink; path: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)

  if (link.children?.length) {
    const childActive = link.children.some((child) => linkMatches(child, path))
    return (
      <div className="w-full">
        <button
          aria-expanded={open}
          className={`w-full flex items-center justify-between py-2 px-4 text-base rounded-xl transition-colors cursor-pointer text-left ${
            childActive ? 'text-slate-900 font-bold' : 'font-semibold text-slate-600 hover:text-primary hover:bg-slate-50'
          }`}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span>{link.label}</span>
          <ChevronDown
            aria-hidden="true"
            className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180 text-primary' : 'text-slate-400'}`}
          />
        </button>
        <div
          className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
            open ? 'max-h-[300px] opacity-100 my-1' : 'max-h-0 opacity-0'
          }`}
        >
          {link.children.map((child) => (
            <MobileItem key={`${child.label}-${child.href}`} link={child} onNavigate={onNavigate} path={path} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <SiteLink
      className={`block w-full text-left py-2 px-4 text-base transition-colors rounded-xl ${
        linkMatches(link, path) ? 'font-bold text-slate-900' : 'font-semibold text-slate-600 hover:text-primary hover:bg-slate-50'
      }`}
      link={link}
      onClick={onNavigate}
    />
  )
}

// A main-menu group in the phone menu: a collapsible section on phones, always open on tablets.
function MobileGroup({ group, path, onNavigate }: { group: NavGroup; path: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-100 sm:border-none pb-2 sm:pb-0">
      <button
        aria-expanded={open}
        className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b sm:border-b-0 border-slate-100 pb-3 mb-2 sm:mb-4 px-2 text-left cursor-pointer sm:cursor-default"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span>{group.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 transition-transform duration-300 sm:hidden ${open ? 'rotate-180 text-primary' : 'text-slate-500'}`}
        />
      </button>
      <div
        className={`space-y-1 transition-all duration-300 overflow-hidden sm:max-h-none sm:opacity-100 ${
          open ? 'max-h-[600px] opacity-100 mb-3' : 'max-h-0 opacity-0'
        }`}
      >
        {group.links.map((link) => (
          <MobileItem key={`${link.label}-${link.href}`} link={link} onNavigate={onNavigate} path={path} />
        ))}
      </div>
    </div>
  )
}

export function SiteHeaderView({ chrome }: { chrome: SiteChrome }) {
  const path = usePathname() || '/'
  // Open state remembers the page it was opened on, so the phone menu and dropdowns close by
  // themselves after navigating (including back/forward) without an extra effect.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null)
  const [dropdown, setDropdown] = useState<{ label: string; path: string } | null>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuOpen = menuOpenOn === path
  const activeDropdown = dropdown?.path === path ? dropdown.label : null
  const setMenuOpen = (open: boolean) => setMenuOpenOn(open ? path : null)
  const setActiveDropdown = (label: string | null) => setDropdown(label ? { label, path } : null)

  // Lock page scrolling while the phone menu covers the screen.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Escape closes whatever is open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpenOn(null)
        setDropdown(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Small delays stop dropdowns flickering as the pointer crosses the menu bar.
  const openDropdown = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setActiveDropdown(label), 200)
  }
  const closeDropdown = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }
  const closeAll = () => {
    setMenuOpen(false)
    setActiveDropdown(null)
  }

  const topLinkClass = (link: NavLink) =>
    `font-bold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 relative py-1 ${
      linkMatches(link, path) ? 'text-primary' : 'text-title hover:text-primary'
    }`

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 bg-white text-primary p-2 rounded z-[100]"
        href="#main-content"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-[60] w-full bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.08)] py-1 flex flex-col">
        {/* Tier 0: institutional links strip */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-wide px-4 lg:px-6 xl:px-12 text-black border-b border-slate-100/80">
          <div className="w-full max-w-screen-2xl mx-auto flex items-center min-h-7 sm:min-h-8 py-1.5 sm:py-1">
            {/* One swipeable row on phones, so a long Site Settings list doesn't push the page down */}
            <nav
              aria-label="Institutional links"
              className="flex flex-nowrap sm:flex-wrap items-center gap-y-1 overflow-x-auto sm:overflow-visible scrollbar-hide whitespace-nowrap"
            >
              {chrome.utilityLinks.map((link, index) => (
                <span className="inline-flex items-center shrink-0" key={`${link.label}-${link.href}`}>
                  <SiteLink className="leading-snug hover:text-primary hover:underline underline-offset-4" link={link} />
                  {index < chrome.utilityLinks.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-2 sm:mx-2.5 text-[10px] sm:text-[11px] select-none font-normal text-black/35"
                    >
                      |
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Tier 1: logo, quick links and the Admissions button */}
        <div className="py-3 px-4 lg:px-6 xl:px-12 bg-white text-title border-b border-slate-100/80">
          <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center">
            <Link className="flex items-center gap-3 lg:gap-4 select-none" href="/">
              <img
                alt={`${chrome.instituteName} logo`}
                className="h-10 md:h-12 lg:h-14 w-auto object-contain shrink-0"
                decoding="async"
                fetchPriority="high"
                height={112}
                src={chrome.logoSrc}
                width={120}
              />
              <span className="font-['Libre_Baskerville',serif] font-bold text-sm md:text-base lg:text-xl tracking-tight leading-tight text-primary">
                <span className="hidden sm:inline text-balance">{chrome.instituteName}</span>
                <span className="sm:hidden text-base">MSIT Delhi</span>
              </span>
            </Link>

            <div className="hidden xl:flex items-center space-x-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">
              {/* The logo bar fits three quick links; the phone menu lists them all. */}
              {chrome.quickLinks.slice(0, 3).map((link) => (
                <SiteLink className="transition-colors hover:text-primary" key={`${link.label}-${link.href}`} link={link} />
              ))}
              <SiteLink
                className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest whitespace-nowrap bg-primary text-white hover:bg-primary-dark transition-colors shadow-md shadow-blue-900/10"
                link={chrome.admissionsLink}
              />
            </div>

            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden w-10 h-10 relative flex justify-center items-center cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
            >
              <span
                className={`block w-6 h-0.5 rounded-full absolute bg-slate-900 transition-all duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-2'}`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full absolute bg-slate-900 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full absolute bg-slate-900 transition-all duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-2'}`}
              />
            </button>
          </div>
        </div>

        {/* Tier 2: main menu with dropdowns (large screens) */}
        <div className="bg-white py-1.5 px-4 lg:px-6 xl:px-12">
          <div className="w-full max-w-screen-2xl mx-auto">
            <nav aria-label="Main" className="hidden xl:flex justify-center items-center space-x-7 text-[13px]">
              <Link
                aria-label="Home"
                className={`flex items-center transition-colors shrink-0 py-1 ${
                  path === '/' ? 'text-primary' : 'text-title hover:text-primary'
                }`}
                href="/"
                title="Home"
              >
                <House aria-hidden="true" className="w-4 h-4" />
              </Link>
              {chrome.groups.map((group) => {
                const active = groupIsActive(group, path)
                const open = activeDropdown === group.label
                return (
                  <div
                    className="relative group px-1 py-1 shrink-0"
                    key={group.label}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeDropdown()
                    }}
                    onFocus={() => setActiveDropdown(group.label)}
                    onMouseEnter={() => openDropdown(group.label)}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      aria-expanded={open}
                      className={`flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors whitespace-nowrap py-1 ${
                        active ? 'text-primary' : 'text-title hover:text-primary'
                      }`}
                      onClick={() => setActiveDropdown(open ? null : group.label)}
                      type="button"
                    >
                      {group.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={`w-3 h-3 shrink-0 transition-colors ${
                          active ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 origin-top ${
                        open
                          ? 'opacity-100 scale-100 translate-y-0 visible'
                          : 'opacity-0 scale-95 -translate-y-2 invisible'
                      }`}
                    >
                      <div className="bg-white shadow-card rounded-xl border border-slate-100 p-6 w-80 text-left">
                        <div className="flex flex-col space-y-3.5">
                          {group.links.map((link) => (
                            <DropdownItem
                              key={`${link.label}-${link.href}`}
                              link={link}
                              onNavigate={closeAll}
                              path={path}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {chrome.topLinks.map((link) => (
                <SiteLink className={topLinkClass(link)} key={`${link.label}-${link.href}`} link={link} />
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Phone and tablet menu */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[55] bg-white text-slate-900 overflow-y-auto xl:hidden transition-all duration-300 ease-out pt-32 pb-16 ${
          menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-4'
        }`}
      >
        <div className="p-6 sm:p-10 max-w-lg sm:max-w-4xl md:max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 sm:gap-y-8">
            {chrome.groups.map((group) => (
              <MobileGroup group={group} key={group.label} onNavigate={closeAll} path={path} />
            ))}
          </div>

          <div className="pt-8 mt-6 border-t border-slate-100 pb-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900 pb-3 mb-2 px-2">
              Quick links
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-6">
              {[...chrome.quickLinks, ...chrome.topLinks].map((link) => (
                <MobileItem key={`${link.label}-${link.href}`} link={link} onNavigate={closeAll} path={path} />
              ))}
            </div>
            <SiteLink
              className="block w-full py-4 text-center rounded-2xl bg-primary text-white font-bold text-base shadow-card hover:bg-primary-dark transition-colors"
              link={chrome.admissionsLink}
              onClick={closeAll}
            />
          </div>
        </div>
      </div>
    </>
  )
}
