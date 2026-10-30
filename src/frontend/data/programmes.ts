import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'
import type { Programme } from '@/payload-types'

const publishedWhere = {
  _status: {
    equals: 'published' as const,
  },
}

export const findProgrammes = cache(async (): Promise<Programme[]> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'programmes',
    depth: 1,
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: 'name',
    where: publishedWhere,
  })

  return result.docs
})

export const findProgrammeBySlug = cache(async (slug: string): Promise<Programme | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'programmes',
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, publishedWhere],
    },
  })

  return result.docs[0]
})
