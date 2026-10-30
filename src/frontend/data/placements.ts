import { cache } from 'react'
import { getPublicPayload } from '@/frontend/data/payload'
import type { PlacementYear } from '@/payload-types'
const published = { _status: { equals: 'published' as const } }
export const findPlacementYears = cache(async (): Promise<PlacementYear[]> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'placement-years',
    depth: 2,
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: '-year',
    where: published,
  })
  return result.docs
})
export const findPlacementYear = cache(async (year: number): Promise<PlacementYear | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'placement-years',
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: { and: [{ year: { equals: year } }, published] },
  })
  return result.docs[0]
})
