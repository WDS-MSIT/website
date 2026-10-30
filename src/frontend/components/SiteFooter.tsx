import { CmsLink } from '@/frontend/components/CmsLink'
import { findSafeHref } from '@/frontend/data/urls'
import type { SiteSetting } from '@/payload-types'

export function SiteFooter({ site }: { site: SiteSetting }) {
  return (
    <footer className="site-footer">
      <section aria-labelledby="site-contact-heading" className="site-contact">
        <h2 id="site-contact-heading">Contact</h2>
        {site.address ? <address>{site.address}</address> : null}
        {site.contactLines?.length ? (
          <dl>
            {site.contactLines.map((contact, index) => (
              <div key={contact.id || `${contact.label}-${index}`}>
                <dt>{contact.label}</dt>
                <dd>
                  {findSafeHref(contact.href) ? (
                    <a href={findSafeHref(contact.href)}>{contact.value}</a>
                  ) : (
                    contact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </section>

      {site.footerLinks?.length ? (
        <nav aria-label="Footer navigation" className="footer-navigation">
          <ul>
            {site.footerLinks.map((link, index) => (
              <li key={link.id || `${link.label}-${index}`}>
                <CmsLink link={link}>{link.label}</CmsLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <p className="footer-text">
        {site.footerText ? `${site.footerText} | ` : null}
        {new Date().getFullYear()}
      </p>
    </footer>
  )
}
