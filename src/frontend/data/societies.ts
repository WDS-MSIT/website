import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'
import type { Society } from '@/payload-types'

const published = { _status: { equals: 'published' as const } }

export const findSocieties = cache(async (): Promise<Society[]> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'societies',
    depth: 2,
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: 'sortOrder',
    where: published,
  })
  return result.docs
})

export const findSocietyBySlug = cache(async (slug: string): Promise<Society | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'societies',
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: { and: [{ slug: { equals: slug } }, published] },
  })
  return result.docs[0]
})
