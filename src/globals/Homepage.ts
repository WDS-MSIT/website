import type { GlobalConfig } from 'payload'

import { superadminOnly } from '@/access/users'
import { linkFields } from '@/fields/link'

const isManualSection = (siblingData: unknown): boolean => {
  if (!siblingData || typeof siblingData !== 'object' || !('selectionMode' in siblingData)) {
    return false
  }

  return siblingData.selectionMode === 'manual'
}

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  dbName: 'home',
  label: 'Homepage',
  access: {
    read: () => true,
    update: superadminOnly,
  },
  admin: {
    group: 'Site',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Highlights',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'heroSlides',
              type: 'array',
              admin: {
                description: 'Ordered homepage highlights. Use Media after assets are migrated.',
              },
              fields: [
                {
                  name: 'caption',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'relationship',
                  relationTo: 'media',
                },
                {
                  name: 'legacyImageUrl',
                  type: 'text',
                  admin: {
                    description: 'Temporary source URL until the image is migrated into Media.',
                  },
                },
                ...linkFields({ allowNone: true, includeLabel: false }),
              ],
            },
          ],
        },
        {
          label: 'Updates',
          fields: [
            {
              name: 'updateSections',
              type: 'array',
              admin: {
                description: 'Homepage feeds such as Latest News, Achievements and Notices.',
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'updateType',
                  type: 'select',
                  options: [
                    { label: 'News', value: 'news' },
                    { label: 'Notice', value: 'notice' },
                    { label: 'Achievement', value: 'achievement' },
                  ],
                  required: true,
                },
                {
                  name: 'selectionMode',
                  type: 'select',
                  defaultValue: 'latest',
                  options: [
                    { label: 'Latest automatically', value: 'latest' },
                    { label: 'Choose manually', value: 'manual' },
                  ],
                  required: true,
                },
                {
                  name: 'itemLimit',
                  type: 'number',
                  admin: {
                    condition: (_data, siblingData) => !isManualSection(siblingData),
                  },
                  defaultValue: 5,
                  max: 20,
                  min: 1,
                },
                {
                  name: 'selectedUpdates',
                  type: 'relationship',
                  relationTo: 'updates',
                  hasMany: true,
                  admin: {
                    condition: (_data, siblingData) => isManualSection(siblingData),
                    description: 'Order these records as they should appear on the homepage.',
                  },
                },
                {
                  name: 'viewAllPath',
                  type: 'text',
                  admin: {
                    description: 'Optional internal destination for the View all action.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Campus tour',
          fields: [
            {
              name: 'campusTour',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                },
                {
                  name: 'videoUrl',
                  type: 'text',
                  admin: {
                    description: 'The current site uses a YouTube embed.',
                  },
                },
                {
                  name: 'gallery',
                  type: 'array',
                  fields: [
                    {
                      name: 'caption',
                      type: 'text',
                    },
                    {
                      name: 'image',
                      type: 'relationship',
                      relationTo: 'media',
                    },
                    {
                      name: 'legacyImageUrl',
                      type: 'text',
                      admin: {
                        description: 'Temporary source URL until the image is migrated into Media.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Source review',
          fields: [
            {
              name: 'reviewStatus',
              type: 'select',
              defaultValue: 'unreviewed',
              options: [
                { label: 'Unreviewed', value: 'unreviewed' },
                { label: 'Needs confirmation', value: 'needs-confirmation' },
                { label: 'Verified', value: 'verified' },
                { label: 'Rejected', value: 'rejected' },
              ],
              required: true,
            },
            {
              name: 'sourceUrl',
              type: 'text',
            },
            {
              name: 'sourceSnapshotFile',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
    max: 20,
  },
}
