import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Committees: CollectionConfig = {
  slug: 'committees',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'slug', '_status'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
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
      name: 'members',
      type: 'array',
      fields: [
        {
          name: 'person',
          type: 'relationship',
          relationTo: 'people',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name or office',
          required: true,
        },
        {
          name: 'designation',
          type: 'text',
        },
        {
          name: 'committeeRole',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
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
      name: 'sourceUrl',
      type: 'text',
    },
    {
      name: 'sourceSnapshotFile',
      type: 'text',
    },
    {
      name: 'legacyPath',
      type: 'text',
      index: true,
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
