import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'
import type { Committee } from '@/payload-types'

const published = { _status: { equals: 'published' as const } }

export const findCommittees = cache(async (): Promise<Committee[]> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'committees',
    depth: 2,
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: 'name',
    where: published,
  })
  return result.docs
})

export const findCommitteeBySlug = cache(async (slug: string): Promise<Committee | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'committees',
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: { and: [{ slug: { equals: slug } }, published] },
  })
  return result.docs[0]
})
