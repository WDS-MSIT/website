import type { Metadata } from 'next'
import { parsePage } from '@/frontend/data/pagination'
import { findUpdates } from '@/frontend/data/updates'
import { UpdateIndexTemplate } from '@/frontend/templates/UpdateIndexTemplate'
export const metadata: Metadata = { alternates: { canonical: '/news' }, title: 'News' }
type Props = { searchParams: Promise<{ page?: string | string[] }> }
export default async function NewsPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page)
  return (
    <UpdateIndexTemplate basePath="/news" heading="News" result={await findUpdates(page, 'news')} />
  )
}
