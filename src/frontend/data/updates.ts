import { cache } from 'react'
import { getPublicPayload } from '@/frontend/data/payload'
import type { Update } from '@/payload-types'
import type { PaginatedDocs, Where } from 'payload'

export type UpdateType = Update['type']
const activeUpdateWhere = (type?: UpdateType): Where => ({
  and: [
    { _status: { equals: 'published' } },
    {
      or: [
        { expiryDate: { exists: false } },
        { expiryDate: { greater_than: new Date().toISOString() } },
      ],
    },
    ...(type ? [{ type: { equals: type } }] : []),
  ],
})
export const findUpdates = cache(
  async (page: number, type?: UpdateType): Promise<PaginatedDocs<Update>> => {
    const payload = await getPublicPayload()
    return payload.find({
      collection: 'updates',
      depth: 2,
      draft: false,
      limit: 20,
      overrideAccess: false,
      page,
      sort: '-publicationDate',
      where: activeUpdateWhere(type),
    })
  },
)
export const findUpdateBySlug = cache(async (slug: string): Promise<Update | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'updates',
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  })
  return result.docs[0]
})
