import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['title', 'startsAt', 'eventStatus', 'reviewStatus', '_status'],
    useAsTitle: 'title',
  },
  defaultSort: '-startsAt',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              index: true,
              required: true,
              unique: true,
            },
            {
              name: 'summary',
              type: 'textarea',
              admin: {
                description: 'Short event description for listings.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              admin: {
                description: 'Optional full event description or retrospective report.',
              },
            },
            {
              name: 'eventStatus',
              type: 'select',
              defaultValue: 'scheduled',
              options: [
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Completed', value: 'completed' },
                { label: 'Postponed', value: 'postponed' },
                { label: 'Cancelled', value: 'cancelled' },
              ],
              required: true,
            },
          ],
        },
        {
          label: 'Schedule & ownership',
          fields: [
            {
              name: 'startsAt',
              type: 'date',
              admin: {
                description:
                  'Leave blank when the legacy source does not provide a complete, trustworthy date.',
              },
              index: true,
            },
            {
              name: 'endsAt',
              type: 'date',
              admin: {
                description: 'Use for multi-day events or events with a known end time.',
              },
            },
            {
              name: 'allDay',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Turn off only when exact event times are known.',
              },
            },
            {
              name: 'deliveryMode',
              type: 'select',
              defaultValue: 'unspecified',
              options: [
                { label: 'Unspecified', value: 'unspecified' },
                { label: 'In person', value: 'in-person' },
                { label: 'Online', value: 'online' },
                { label: 'Hybrid', value: 'hybrid' },
              ],
              required: true,
            },
            {
              name: 'venue',
              type: 'text',
              admin: {
                description: 'Physical venue or online platform stated by the source.',
              },
            },
            {
              name: 'departments',
              type: 'relationship',
              hasMany: true,
              relationTo: 'departments',
            },
            {
              name: 'societies',
              type: 'relationship',
              hasMany: true,
              relationTo: 'societies',
            },
            {
              name: 'organisers',
              type: 'array',
              admin: {
                description:
                  'Named cells, placement teams, partner organisations, or other organisers without their own collection.',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Reports & media',
          fields: [
            {
              name: 'registrationUrl',
              type: 'text',
              admin: {
                description: 'Optional registration or official external event page.',
              },
            },
            {
              name: 'reports',
              type: 'relationship',
              hasMany: true,
              relationTo: 'documents',
              admin: {
                description: 'Reviewed event reports and supporting documents.',
              },
            },
            {
              name: 'legacyReports',
              type: 'array',
              admin: {
                description:
                  'Temporary source links until legacy event reports are migrated into Documents.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'relationship',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
            {
              name: 'legacyImages',
              type: 'array',
              admin: {
                description: 'Temporary source images pending review and migration into Media.',
              },
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Migration & review',
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
            {
              name: 'sourceOrder',
              type: 'number',
              admin: {
                description: 'Original position in the legacy event list.',
                hidden: true,
              },
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
