import type { Metadata } from 'next'
import { parsePage } from '@/frontend/data/pagination'
import { findUpdates } from '@/frontend/data/updates'
import { UpdateIndexTemplate } from '@/frontend/templates/UpdateIndexTemplate'
export const metadata: Metadata = { alternates: { canonical: '/notices' }, title: 'Notices' }
type Props = { searchParams: Promise<{ page?: string | string[] }> }
export default async function NoticesPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page)
  return (
    <UpdateIndexTemplate
      basePath="/notices"
      heading="Notices"
      result={await findUpdates(page, 'notice')}
    />
  )
}
