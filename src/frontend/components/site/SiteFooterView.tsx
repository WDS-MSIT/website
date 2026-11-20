'use client'

/* eslint-disable @next/next/no-img-element */
// NOTE: The logo can be a reviewed legacy URL from Site Settings, so a plain <img> is used, as in CmsImage.

import { ArrowRight, ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { SiteLink } from '@/frontend/components/site/SiteLink'
import type { SiteChrome } from '@/frontend/data/site-navigation'

// Not in Site Settings yet, so kept with the design.
const SOCIAL_LINKS = [
  { Icon: Facebook, href: 'https://www.facebook.com/msitnewdelhi/', label: 'Follow MSIT on Facebook' },
  { Icon: Twitter, href: 'https://x.com/msitnewdelhi?lang=en', label: 'Follow MSIT on X (Twitter)' },
  {
    Icon: Linkedin,
    href: 'https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/posts/?feedView=all',
    label: 'Follow MSIT on LinkedIn',
  },
  { Icon: Instagram, href: 'https://www.instagram.com/msitnewdelhi/?hl=en', label: 'Follow MSIT on Instagram' },
]

const contactIcon = (line: { label: string; href?: string }) => {
  if (line.href?.startsWith('mailto:') || /mail/i.test(line.label)) return Mail
  return Phone
}

// Column heading that toggles its links on phones; on large screens every column stays open.
function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <h3>
        <button
          aria-expanded={open}
          className="w-full text-white text-xs font-bold uppercase tracking-[0.25em] mb-4 lg:mb-10 opacity-80 cursor-pointer lg:cursor-default flex items-center justify-between lg:block text-left font-sans"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span>{title}</span>
          <ChevronDown
            aria-hidden="true"
            className={`w-4 h-4 transition-transform duration-300 lg:hidden ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        className={`transition-all duration-300 overflow-hidden lg:overflow-visible ${
          open
            ? 'max-h-[400px] opacity-100 mb-6'
            : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-0 pointer-events-none lg:pointer-events-auto'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export function SiteFooterView({ chrome }: { chrome: SiteChrome }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 pt-12 lg:pt-16 pb-12 border-t border-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-10 lg:mb-20">
          {/* Identity and contact */}
          <div className="lg:col-span-2 pr-4">
            <Link
              aria-label={`${chrome.instituteName} home`}
              className="flex items-center gap-4 mb-10 group"
              href="/"
            >
              <img
                alt={`${chrome.instituteName} logo`}
                className="h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105 brightness-[1.1]"
                decoding="async"
                height={112}
                loading="lazy"
                src={chrome.logoSrc}
                width={120}
              />
              <span className="font-['Libre_Baskerville',serif] font-bold text-base md:text-xl tracking-tight leading-tight text-white group-hover:text-[#8fb0ee] transition-colors">
                {chrome.instituteName}
              </span>
            </Link>
            <p className="text-slate-300 font-medium leading-relaxed mb-6 lg:mb-10 max-w-sm">
              Shaping tomorrow&apos;s engineers and innovators through exceptional academic rigor
              and profound industry immersion.
            </p>
            <address className="not-italic space-y-4 lg:space-y-6 text-sm font-bold text-slate-400">
              <div className="flex items-start group">
                <MapPin
                  aria-hidden="true"
                  className="w-5 h-5 mr-4 text-slate-600 shrink-0 mt-0.5 group-hover:text-[#8fb0ee] transition-colors"
                />
                {chrome.address.mapUrl ? (
                  <a
                    className="hover:text-white transition-colors leading-relaxed"
                    href={chrome.address.mapUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {chrome.address.text}
                  </a>
                ) : (
                  <span className="leading-relaxed whitespace-pre-line">{chrome.address.text}</span>
                )}
              </div>
              {chrome.contactLines.map((line) => {
                const Icon = contactIcon(line)
                return (
                  <div className="flex items-center group" key={`${line.label}-${line.value}`}>
                    <Icon
                      aria-hidden="true"
                      className="w-5 h-5 mr-4 text-slate-600 shrink-0 group-hover:text-[#8fb0ee] transition-colors"
                    />
                    <span className="sr-only">{line.label}: </span>
                    {line.href ? (
                      <a className="hover:text-white transition-colors tracking-wide" href={line.href}>
                        {line.value}
                      </a>
                    ) : (
                      <span className="tracking-wide">{line.value}</span>
                    )}
                  </div>
                )
              })}
            </address>
          </div>

          {/* Link columns */}
          {chrome.footerColumns.map((column) => (
            <FooterColumn key={column.label} title={column.label}>
              <ul className="space-y-3 lg:space-y-5 font-bold text-sm">
                {column.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <SiteLink className="hover:text-[#8fb0ee] transition-colors flex items-center gap-2 group" link={link}>
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#8fb0ee] transition-colors"
                      />
                      {link.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          ))}

          {/* Social and publications */}
          <FooterColumn title="Follow Us">
            <div className="flex gap-4 mb-6 lg:mb-10">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center transition-all hover:-translate-y-1 border border-slate-800 hover:border-slate-600 hover:text-white"
                  href={href}
                  key={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-900">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fb0ee] mb-3">
                Newsletter
              </p>
              <Link
                className="flex items-center justify-between w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-300 hover:text-white rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all group"
                href="/newsletters-magazines"
              >
                <span>Publications</span>
                <ArrowRight
                  aria-hidden="true"
                  className="w-4 h-4 text-[#8fb0ee] group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </FooterColumn>
        </div>

        {/* Disambiguation disclaimer */}
        <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-900/50 pt-8 pb-4 text-center md:text-left">
          <strong>Disclaimer:</strong> Maharaja Surajmal Institute of Technology (MSIT), Janakpuri,
          New Delhi is a B.Tech engineering institution affiliated with GGSIPU. It operates
          independently from its sister entity, Maharaja Surajmal Institute (MSI, offering
          BBA/BCA/B.Com), and Meghnad Saha Institute of Technology (MSIT), Kolkata.
        </p>

        {/* Bottom bar */}
        <div className="pt-12 pb-20 md:pb-0 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold tracking-widest uppercase text-slate-400">
          <span>
            © {year} {chrome.footerText || 'MSIT New Delhi'}
          </span>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link className="hover:text-white transition-colors" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-white transition-colors" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-white transition-colors" href="/admin">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
