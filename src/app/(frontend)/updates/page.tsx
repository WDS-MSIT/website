import type { Metadata } from 'next'
import { parsePage } from '@/frontend/data/pagination'
import { findUpdates } from '@/frontend/data/updates'
import { UpdateIndexTemplate } from '@/frontend/templates/UpdateIndexTemplate'
export const metadata: Metadata = { alternates: { canonical: '/updates' }, title: 'Updates' }
type Props = { searchParams: Promise<{ page?: string | string[] }> }
export default async function UpdatesPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page)
  return (
    <UpdateIndexTemplate basePath="/updates" heading="Updates" result={await findUpdates(page)} />
  )
}
