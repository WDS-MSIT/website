import { SiteHeaderView } from '@/frontend/components/site/SiteHeaderView'
import { buildSiteChrome } from '@/frontend/data/site-navigation'
import type { SiteSetting } from '@/payload-types'

// Header in the MSIT design. Menus come from Site Settings, with the design's defaults for anything
// not yet filled in (see buildSiteChrome).
// TODO: Show Site Settings announcements and affiliationSummary; the design has no header slot for
// them yet (announcements are planned for the homepage notice ticker).
export function SiteHeader({ site }: { site: SiteSetting }) {
  return <SiteHeaderView chrome={buildSiteChrome(site)} />
}
