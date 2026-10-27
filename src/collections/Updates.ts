import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Updates: CollectionConfig = {
  slug: 'updates',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['title', 'type', 'publicationDate', 'featured', '_status'],
    useAsTitle: 'title',
  },
  defaultSort: '-publicationDate',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Notice', value: 'notice' },
        { label: 'Achievement', value: 'achievement' },
      ],
      required: true,
    },
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short listing and sharing summary. Do not duplicate the full body.',
      },
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'publicationDate',
      type: 'date',
      index: true,
      admin: {
        description: 'Leave blank when the source does not provide a verified publication date.',
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      index: true,
      admin: {
        description:
          'The public site can use this to remove an item from current listings without deleting its historical page.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Allows deliberate homepage promotion; it is not inferred from legacy “new” markers.',
      },
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
      admin: {
        description: 'Ordered supporting notices, circulars, reports, or other reviewed documents.',
      },
    },
    {
      name: 'legacyAttachments',
      type: 'array',
      admin: {
        description:
          'Temporary links to files still hosted on msit.in. Migrate these to Documents before retiring the old file host.',
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
      name: 'externalLink',
      type: 'text',
      admin: {
        description: 'Optional registration, application, or other non-file destination.',
      },
    },
    {
      name: 'thumbnail',
      type: 'relationship',
      relationTo: 'media',
    },
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
        description: 'Original position in the saved legacy list; lower numbers appeared first.',
        hidden: true,
      },
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
