import type { Payload } from 'payload'

import { canonicalRedirects } from '@/seed/site-settings'

const redirects = [...canonicalRedirects, ['/achievement/3', '/achievements']] as const

export const seedRedirects = async (payload: Payload): Promise<void> => {
  const existing = await payload.find({
    collection: 'redirects',
    limit: 1000,
    overrideAccess: true,
    pagination: false,
  })
  const existingPaths = new Set(existing.docs.map((redirect) => redirect.sourcePath))
  let created = 0

  for (const [sourcePath, destinationPath] of redirects) {
    if (existingPaths.has(sourcePath)) continue

    await payload.create({
      collection: 'redirects',
      data: {
        active: true,
        destinationPath,
        note: 'Seeded from the normalized legacy route map.',
        permanent: true,
        sourcePath,
      },
      overrideAccess: true,
    })
    existingPaths.add(sourcePath)
    created += 1
  }

  payload.logger.info(
    `Seeded ${created} redirects; left ${existing.docs.length} existing redirects unchanged`,
  )
}
