import { SiteFooterView } from '@/frontend/components/site/SiteFooterView'
import { buildSiteChrome } from '@/frontend/data/site-navigation'
import type { SiteSetting } from '@/payload-types'

// Footer in the MSIT design. Content comes from Site Settings, with the design's defaults for
// anything not yet filled in (see buildSiteChrome).
export function SiteFooter({ site }: { site: SiteSetting }) {
  return <SiteFooterView chrome={buildSiteChrome(site)} />
}
