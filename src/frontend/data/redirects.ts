import { cache } from 'react'

import { getPublicPayload } from '@/frontend/data/payload'
import type { Redirect } from '@/payload-types'

export const findRedirectByPath = cache(
  async (sourcePath: string): Promise<Redirect | undefined> => {
    const payload = await getPublicPayload()
    const result = await payload.find({
      collection: 'redirects',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: {
        and: [{ active: { equals: true } }, { sourcePath: { equals: sourcePath } }],
      },
    })

    const redirect = result.docs[0]
    if (
      !redirect ||
      !redirect.destinationPath.startsWith('/') ||
      redirect.destinationPath.startsWith('//') ||
      redirect.destinationPath === sourcePath
    ) {
      return undefined
    }

    return redirect
  },
)
