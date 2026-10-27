import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['title', 'department', 'reviewStatus', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: {
        description: 'Leave empty for institute-wide documents.',
      },
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
      name: 'legacyUrl',
      type: 'text',
      admin: {
        description: 'The file URL on the previous website, when one exists.',
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
  upload: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/csv',
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
