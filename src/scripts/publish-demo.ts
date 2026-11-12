import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'
import { findCanonicalPath } from '@/seed/site-settings'

const demoCollections = [
  'departments',
  'programmes',
  'placement-years',
  'people',
  'committees',
  'facilities',
  'societies',
  'events',
  'updates',
  'pages',
] as const

if (process.env.ALLOW_DEMO_PUBLISH !== 'true') {
  throw new Error('Set ALLOW_DEMO_PUBLISH=true to publish the seeded demo content')
}

const payload = await getPayload({ config })

const normalizeLinks = <
  T extends {
    destinationType?: null | string
    internalPath?: null | string
  },
>(
  links: null | T[] | undefined,
): T[] =>
  (links || []).map((link) => ({
    ...link,
    destinationType:
      link.destinationType === 'internal-path' && link.internalPath?.startsWith('/media/')
        ? 'external-url'
        : link.destinationType,
    externalUrl:
      link.destinationType === 'internal-path' && link.internalPath?.startsWith('/media/')
        ? new URL(link.internalPath, 'https://msit.in').href
        : 'externalUrl' in link
          ? link.externalUrl
          : undefined,
    internalPath:
      link.destinationType === 'internal-path' && link.internalPath?.startsWith('/media/')
        ? null
        : link.destinationType === 'internal-path' && link.internalPath
          ? findCanonicalPath(link.internalPath)
          : link.internalPath,
  }))

try {
  for (const collection of demoCollections) {
    const result = await payload.update({
      collection,
      data: {
        _status: 'published',
      },
      depth: 0,
      draft: false,
      limit: 10_000,
      overrideAccess: true,
      where: {
        _status: {
          equals: 'draft',
        },
      },
    })

    payload.logger.info(`Published ${result.docs.length} ${collection} demo records`)
  }

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    draft: true,
    overrideAccess: true,
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      _status: 'published',
      announcements: normalizeLinks(siteSettings.announcements),
      footerLinks: normalizeLinks(siteSettings.footerLinks),
      navigationGroups: (siteSettings.navigationGroups || []).map((group) => ({
        ...group,
        links: normalizeLinks(group.links),
      })),
      primaryLinks: normalizeLinks(siteSettings.primaryLinks),
      utilityLinks: normalizeLinks(siteSettings.utilityLinks),
    },
    draft: false,
    overrideAccess: true,
  })
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    draft: true,
    overrideAccess: true,
  })
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      _status: 'published',
      updateSections: (homepage.updateSections || []).map((section) => ({
        ...section,
        viewAllPath: section.viewAllPath
          ? findCanonicalPath(section.viewAllPath)
          : section.viewAllPath,
      })),
    },
    draft: false,
    overrideAccess: true,
  })
  payload.logger.info('Published the site settings and homepage demo globals')
} finally {
  await payload.destroy()
}

process.exit(0)
