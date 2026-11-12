import { cache } from 'react'

import type { Homepage, Update } from '@/payload-types'
import { getPublicPayload } from '@/frontend/data/payload'
import type { HomepageUpdateSection } from '@/frontend/types'

const isUpdate = (value: number | Update): value is Update => typeof value === 'object'

const findSelectedUpdates = async (values: (number | Update)[]): Promise<Update[]> => {
  const payload = await getPublicPayload()
  const populated = values.filter(isUpdate)
  const ids = values.filter((value): value is number => typeof value === 'number')

  if (!ids.length) {
    return populated.filter((update) => update._status === 'published')
  }

  const result = await payload.find({
    collection: 'updates',
    depth: 1,
    draft: false,
    limit: ids.length,
    overrideAccess: false,
    pagination: false,
    where: {
      id: {
        in: ids,
      },
    },
  })
  const updatesById = new Map(result.docs.map((update) => [update.id, update]))

  return values
    .map((value) => (typeof value === 'number' ? updatesById.get(value) : value))
    .filter((update): update is Update => Boolean(update && update._status === 'published'))
}

const findLatestUpdates = async (
  type: 'achievement' | 'news' | 'notice',
  limit: number,
): Promise<Update[]> => {
  const payload = await getPublicPayload()
  const now = new Date().toISOString()
  const result = await payload.find({
    collection: 'updates',
    depth: 1,
    draft: false,
    limit,
    overrideAccess: false,
    sort: '-publicationDate',
    where: {
      and: [
        {
          type: {
            equals: type,
          },
        },
        {
          or: [
            {
              expiryDate: {
                exists: false,
              },
            },
            {
              expiryDate: {
                greater_than: now,
              },
            },
          ],
        },
      ],
    },
  })

  return result.docs
}

const buildUpdateSections = async (homepage: Homepage): Promise<HomepageUpdateSection[]> =>
  Promise.all(
    (homepage.updateSections || []).map(async (section) => {
      const limit = Math.max(1, Math.min(section.itemLimit || 5, 20))
      const updates =
        section.selectionMode === 'manual'
          ? await findSelectedUpdates(section.selectedUpdates || [])
          : await findLatestUpdates(section.updateType, limit)

      return {
        heading: section.heading,
        updates: updates.slice(0, limit),
        viewAllPath: section.viewAllPath,
      }
    }),
  )

export const findSiteSettings = cache(async () => {
  const payload = await getPublicPayload()

  return payload.findGlobal({
    slug: 'site-settings',
    depth: 2,
    draft: false,
    overrideAccess: false,
  })
})

export const findHomepage = cache(async () => {
  const payload = await getPublicPayload()
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 2,
    draft: false,
    overrideAccess: false,
  })

  return {
    homepage,
    updateSections: await buildUpdateSections(homepage),
  }
})
