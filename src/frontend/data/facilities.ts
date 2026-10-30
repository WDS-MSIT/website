import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'
import type { Facility } from '@/payload-types'

const publishedWhere = {
  _status: {
    equals: 'published' as const,
  },
}

export const findFacilities = cache(async (): Promise<Facility[]> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'facilities',
    depth: 2,
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: 'sortOrder',
    where: publishedWhere,
  })

  return result.docs
})

export const findFacilityBySlug = cache(async (slug: string): Promise<Facility | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'facilities',
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
