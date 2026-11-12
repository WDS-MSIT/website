import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'

export const findPageBySlug = cache(async (slug: string) => {
  const payload = await getPublicPayload()
  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
})
