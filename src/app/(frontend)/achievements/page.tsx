import type { Metadata } from 'next'
import { parsePage } from '@/frontend/data/pagination'
import { findUpdates } from '@/frontend/data/updates'
import { UpdateIndexTemplate } from '@/frontend/templates/UpdateIndexTemplate'
export const metadata: Metadata = {
  alternates: { canonical: '/achievements' },
  title: 'Achievements',
}
type Props = { searchParams: Promise<{ page?: string | string[] }> }
export default async function AchievementsPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page)
  return (
    <UpdateIndexTemplate
      basePath="/achievements"
      heading="Achievements"
      result={await findUpdates(page, 'achievement')}
    />
  )
}
