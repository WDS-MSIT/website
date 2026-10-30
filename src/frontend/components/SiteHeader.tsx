import Link from 'next/link'

import { CmsImage } from '@/frontend/components/CmsImage'
import { CmsLink } from '@/frontend/components/CmsLink'
import type { SiteSetting } from '@/payload-types'

export function SiteHeader({ site }: { site: SiteSetting }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        {site.utilityLinks?.length ? (
          <nav aria-label="Utility navigation" className="utility-navigation">
            <ul>
              {site.utilityLinks.map((link, index) => (
                <li key={link.id || `${link.label}-${index}`}>
                  <CmsLink link={link}>{link.label}</CmsLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="site-identity">
          <Link aria-label={`${site.instituteName} homepage`} href="/">
            <CmsImage
              alt={`${site.instituteName} logo`}
              className="site-logo"
              legacyUrl={site.legacyLogoUrl}
              media={site.logo}
            />
            <span className="site-name">{site.instituteName}</span>
          </Link>
          {site.affiliationSummary ? (
            <p className="affiliation-summary">{site.affiliationSummary}</p>
          ) : null}
        </div>

        {site.primaryLinks?.length ? (
          <nav aria-label="Primary navigation" className="primary-navigation">
            <ul>
              {site.primaryLinks.map((link, index) => (
                <li key={link.id || `${link.label}-${index}`}>
                  <CmsLink link={link}>{link.label}</CmsLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {site.navigationGroups?.length ? (
          <nav aria-label="Site sections" className="grouped-navigation">
            {site.navigationGroups.map((group, groupIndex) => (
              <section key={group.id || `${group.label}-${groupIndex}`}>
                <h2>{group.label}</h2>
                <ul>
                  {(group.links || []).map((link, linkIndex) => (
                    <li key={link.id || `${link.label}-${linkIndex}`}>
                      <CmsLink link={link}>{link.label}</CmsLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        ) : null}

        {site.announcements?.length ? (
          <aside aria-label="Announcements" className="site-announcements">
            <ul>
              {site.announcements.map((announcement, index) => (
                <li key={announcement.id || `${announcement.message}-${index}`}>
                  <CmsLink link={announcement}>{announcement.message}</CmsLink>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </header>
    </>
  )
}
