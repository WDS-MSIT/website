import { connection } from 'next/server'
import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@/payload.config'

export const getPublicPayload = cache(async () => {
  // NOTE: Public pages must reflect newly published CMS content on the next request.
  await connection()
  return getPayload({ config })
})
