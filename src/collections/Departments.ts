import type { Access, CollectionConfig } from 'payload'

import { superadminOnly } from '@/access/users'
import { isActiveSuperadmin } from '@/auth/roles'

const publishedOrSuperadmin: Access = ({ req }) => {
  if (isActiveSuperadmin(req.user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const Departments: CollectionConfig = {
  slug: 'departments',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'code', 'slug', '_status'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      admin: {
        description: 'The familiar short name, such as CSE or ECE.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'overview',
      type: 'textarea',
      required: true,
    },
    {
      name: 'vision',
      type: 'textarea',
    },
    {
      name: 'missions',
      type: 'array',
      fields: [
        {
          name: 'statement',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'legacyPath',
      type: 'text',
      admin: {
        description: 'The corresponding path on the previous website.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first in department lists.',
      },
      min: 0,
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
}
