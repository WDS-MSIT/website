import { cache } from 'react'
import { getPublicPayload } from '@/frontend/data/payload'
import type { Event } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
const published = { _status: { equals: 'published' as const } }
export const findEvents = cache(async (page: number): Promise<PaginatedDocs<Event>> => {
  const payload = await getPublicPayload()
  return payload.find({
    collection: 'events',
    depth: 2,
    draft: false,
    limit: 20,
    overrideAccess: false,
    page,
    sort: '-startsAt',
    where: published,
  })
})
export const findEventBySlug = cache(async (slug: string): Promise<Event | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'events',
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: { and: [{ slug: { equals: slug } }, published] },
  })
  return result.docs[0]
})
