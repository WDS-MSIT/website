import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findEventBySlug } from '@/frontend/data/events'
import { EventTemplate } from '@/frontend/templates/EventTemplate'
type Props = { params: Promise<{ slug: string }> }
const findEvent = async (params: Props['params']) => findEventBySlug((await params).slug)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await findEvent(params)
  return event
    ? {
        alternates: { canonical: `/events/${event.slug}` },
        description: event.summary || undefined,
        title: event.title,
      }
    : {}
}
export default async function EventPage({ params }: Props) {
  const event = await findEvent(params)
  if (!event) notFound()
  return <EventTemplate event={event} />
}
