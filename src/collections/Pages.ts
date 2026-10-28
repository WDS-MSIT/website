import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'
import { pageBlocks } from '@/blocks/pageBlocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'reviewStatus', '_status'],
    useAsTitle: 'title',
  },
  defaultSort: 'title',
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
              admin: {
                description: 'The public path without a leading slash, such as about/history.',
              },
              index: true,
              required: true,
              unique: true,
            },
            {
              name: 'summary',
              type: 'textarea',
              admin: {
                description: 'A short introduction for listings and page metadata.',
              },
            },
            {
              name: 'content',
              type: 'blocks',
              blocks: pageBlocks,
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
              name: 'legacyPath',
              type: 'text',
              admin: {
                description: 'The corresponding path on the previous website.',
              },
              index: true,
              unique: true,
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
    maxPerDoc: 20,
  },
}
