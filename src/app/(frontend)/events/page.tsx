import type { Metadata } from 'next'
import { findEvents } from '@/frontend/data/events'
import { parsePage } from '@/frontend/data/pagination'
import { EventIndexTemplate } from '@/frontend/templates/EventIndexTemplate'
export const metadata: Metadata = { alternates: { canonical: '/events' }, title: 'Events' }
type Props = { searchParams: Promise<{ page?: string | string[] }> }
export default async function EventsPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page)
  return <EventIndexTemplate result={await findEvents(page)} />
}
