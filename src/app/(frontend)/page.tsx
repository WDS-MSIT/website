import { findHomepage } from '@/frontend/data/site'
import { HomeTemplate } from '@/frontend/templates/HomeTemplate'

export default async function HomePage() {
  const { homepage, updateSections } = await findHomepage()

  return <HomeTemplate homepage={homepage} updateSections={updateSections} />
}
