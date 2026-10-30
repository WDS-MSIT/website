import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'
import type { Person } from '@/payload-types'

const publishedWhere = {
  _status: {
    equals: 'published' as const,
  },
}

export const findPeople = cache(async (): Promise<Person[]> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'people',
    depth: 2,
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    sort: ['sortOrder', 'name'],
    where: publishedWhere,
  })

  return result.docs
})

export const findPersonBySlug = cache(async (slug: string): Promise<Person | undefined> => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'people',
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

export const findPeopleByType = cache(
  async (type: Person['personTypes'][number]): Promise<Person[]> =>
    (await findPeople()).filter((person) => person.personTypes.includes(type)),
)
