import { findProgrammes } from '@/frontend/data/programmes'
import { findHomepage, findSiteSettings } from '@/frontend/data/site'
import { HomeTemplate } from '@/frontend/templates/HomeTemplate'

export default async function HomePage() {
  const [{ homepage, updateSections }, site, programmes] = await Promise.all([
    findHomepage(),
    findSiteSettings(),
    findProgrammes(),
  ])

  return (
    <HomeTemplate
      announcements={site.announcements || []}
      homepage={homepage}
      programmes={programmes}
      updateSections={updateSections}
    />
  )
}
