import { findLinkHref } from '@/frontend/components/CmsLink'
import { findSafeHref, findSafeResourceUrl } from '@/frontend/data/urls'
import type { CmsLinkData } from '@/frontend/types'
import type { SiteSetting } from '@/payload-types'

/*
 * Header and footer content for the public site.
 *
 * Each part comes from Site Settings when an editor has filled it in, and otherwise falls back to
 * the menus of the redesigned MSIT website, so the site looks complete while Site Settings is
 * still being populated. Mapping:
 *   utilityLinks      -> thin institutional strip above the header
 *   primaryLinks      -> quick links beside the logo (Faculty Directory, Campus Tour)
 *   navigationGroups  -> main menu dropdowns (About, Admission & Aid, ...)
 *   address, contactLines, footerLinks, footerText -> footer
 */

export type NavLink = {
  label: string
  href: string
  external: boolean
  children?: NavLink[]
}

export type NavGroup = {
  label: string
  links: NavLink[]
}

export type ContactLine = {
  label: string
  value: string
  href?: string
}

export type SiteChrome = {
  instituteName: string
  logoSrc: string
  utilityLinks: NavLink[]
  quickLinks: NavLink[]
  groups: NavGroup[]
  // Fixed parts of the design that Site Settings has no field for yet.
  topLinks: NavLink[]
  admissionsLink: NavLink
  address: { text: string; mapUrl?: string }
  contactLines: ContactLine[]
  footerColumns: NavGroup[]
  footerText?: string
}

const DEFAULT_INSTITUTE_NAME = 'Maharaja Surajmal Institute of Technology'
const DEFAULT_LOGO = '/msit-logo.webp'

const internal = (label: string, href: string, children?: NavLink[]): NavLink => ({
  label,
  href,
  external: false,
  ...(children ? { children } : {}),
})
const external = (label: string, href: string): NavLink => ({ label, href, external: true })

// Menus of the redesigned website (WDS-MSIT/MSIT-), used until Site Settings provides them.
const FALLBACK_UTILITY_LINKS: NavLink[] = [
  external('Affiliation/Accreditation', 'https://msit.in/affiliation'),
  external('IQAC/NAAC', 'https://msit.in/iqac'),
  external('Audit Reports', 'https://msit.in/reports'),
  external('NIRF', 'https://msit.in/nirf'),
  external('Mandatory Disclosure', 'https://msit.in/aicte#mandatory-disclosure'),
]

const FALLBACK_QUICK_LINKS: NavLink[] = [
  internal('Faculty Directory', '/faculty'),
  internal('Campus Tour', '/virtual-tour'),
]

const FALLBACK_GROUPS: NavGroup[] = [
  {
    label: 'About',
    links: [
      internal('About MSIT', '/about'),
      internal('Vision & Mission', '/vision-mission'),
      internal('History & Legacy', '/history'),
      internal('Governing Body', '/govern'),
      internal('From The Desk', '/fromdesk'),
      internal('Campus & Facilities', '/facilities'),
      external('Surajmal Memorial Education Society', 'https://surajmalmemorialeducationsociety.org/'),
    ],
  },
  {
    label: 'Admission & Aid',
    links: [
      internal('Info Brochure', '/brochure'),
      internal('Online Fee Payment', '/online-fee'),
      internal('Scholarships', '/scholarships'),
      internal('Mandatory Disclosures', '/mandatory-disclosures'),
    ],
  },
  {
    label: 'Academics',
    links: [
      internal('B.Tech Programmes', '#', [
        internal('Computer Science & Engineering (CSE)', '/cse'),
        internal('Information Technology Engineering (IT)', '/it'),
        internal('Electronics & Communication Engineering (ECE)', '/ece'),
        internal('Electrical & Electronics Engineering (EEE)', '/eee'),
      ]),
      internal('Applied Sciences', '/applied-sciences'),
      internal('Academic Calendar', '/academic-calendar'),
      internal('Time Table & Syllabus', '/timetable'),
      internal('Research & Innovation', '/research'),
    ],
  },
  {
    label: 'Life at MSIT',
    links: [
      internal('Student Societies', '/society'),
      internal('Events & Festivals', '/events'),
      internal('Newsletters & Magazines', '/newsletters-magazines'),
      internal('Anti-Ragging', '/antiragging'),
      internal('Disaster Management', '/disaster'),
      internal('Discipline Committee', '/discipline'),
      internal('Student Grievance Cell', '/student-grievance'),
    ],
  },
  {
    label: 'Placements',
    links: [
      internal('Careers & Placements', '/placements'),
      internal('Internship & IIIC Cell', '/internship-cell'),
      external('Placement Portal', 'https://placement.msit.in/'),
    ],
  },
  {
    label: 'Student Portal',
    links: [
      internal('Fee Payment Portal', '/online-fee'),
      external('Result & Student Login Portal', 'https://examweb.ggsipu.ac.in/web/login.jsp'),
      external('Library Website', 'http://library.msit.in/'),
      internal('Time Table', '/timetable'),
      internal('Attendance Rules', '/attendance'),
      external('NPTEL Videos', 'http://nptel.ac.in/'),
    ],
  },
]

const TOP_LINKS: NavLink[] = [
  external('Library', 'http://library.msit.in/'),
  internal('Contact', '/contact'),
]

const ADMISSIONS_LINK = external('Admissions', 'https://ipu.admissions.nic.in/')

const FALLBACK_ADDRESS = {
  text: 'C-4, Janakpuri, New Delhi 110058, India',
  mapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Maharaja+Surajmal+Institute+of+Technology+Janakpuri+New+Delhi',
}

const FALLBACK_CONTACT_LINES: ContactLine[] = [
  { label: 'Phone', value: '011-45037193', href: 'tel:01145037193' },
  { label: 'Email', value: 'director@msit.in', href: 'mailto:director@msit.in' },
]

const FALLBACK_FOOTER_COLUMNS: NavGroup[] = [
  {
    label: 'Quick Links',
    links: [
      internal('About MSIT', '/about'),
      internal('Admissions 2026', '/online-fee'),
      internal('Academic Programs', '/cse'),
      internal('Campus Life', '/society'),
      internal('Download Brochure', '/brochure'),
    ],
  },
  {
    label: 'Resources',
    links: [
      internal('Information Bulletin', '/brochure'),
      internal('Academic Calendar', '/academic-calendar'),
      internal('Time Table', '/timetable'),
      internal('Campus Tour & Photos', '/virtual-tour'),
      internal('Sitemap', '/sitemap'),
    ],
  },
]

// A CMS link becomes a NavLink only when it resolves to a safe destination.
const toNavLink = (link: CmsLinkData & { label: string }): NavLink | null => {
  const href = findLinkHref(link)
  if (!href) return null
  return {
    label: link.label,
    href,
    external: Boolean(link.openInNewTab) || /^https?:\/\//.test(href),
  }
}

const toNavLinks = (links?: (CmsLinkData & { label: string })[] | null): NavLink[] =>
  (links || []).map(toNavLink).filter((link): link is NavLink => link !== null)

export function buildSiteChrome(site: SiteSetting): SiteChrome {
  const utilityLinks = toNavLinks(site.utilityLinks)
  const quickLinks = toNavLinks(site.primaryLinks)
  const groups = (site.navigationGroups || [])
    .map((group) => ({ label: group.label, links: toNavLinks(group.links) }))
    .filter((group) => group.links.length > 0)
  const footerLinks = toNavLinks(site.footerLinks)
  const contactLines = (site.contactLines || []).map((line) => ({
    label: line.label,
    value: line.value,
    // Only safe tel:, mailto: and web destinations become links.
    href: findSafeHref(line.href),
  }))
  const logoFromCms = typeof site.logo === 'object' && site.logo ? site.logo.url : undefined

  return {
    instituteName: site.instituteName || DEFAULT_INSTITUTE_NAME,
    logoSrc: findSafeResourceUrl(logoFromCms || site.legacyLogoUrl) || DEFAULT_LOGO,
    utilityLinks: utilityLinks.length ? utilityLinks : FALLBACK_UTILITY_LINKS,
    quickLinks: quickLinks.length ? quickLinks : FALLBACK_QUICK_LINKS,
    groups: groups.length ? groups : FALLBACK_GROUPS,
    topLinks: TOP_LINKS,
    admissionsLink: ADMISSIONS_LINK,
    address: site.address ? { text: site.address } : FALLBACK_ADDRESS,
    contactLines: contactLines.length ? contactLines : FALLBACK_CONTACT_LINES,
    footerColumns: footerLinks.length
      ? [{ label: 'Quick Links', links: footerLinks }]
      : FALLBACK_FOOTER_COLUMNS,
    footerText: site.footerText || undefined,
  }
}
