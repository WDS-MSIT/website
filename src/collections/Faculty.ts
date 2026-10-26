import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'department', 'designation', 'email', '_status'],
    useAsTitle: 'name',
  },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
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
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      required: true,
    },
    {
      name: 'designation',
      type: 'text',
      admin: {
        description: 'Academic rank, such as Professor or Associate Professor.',
      },
      required: true,
    },
    {
      name: 'qualifications',
      type: 'array',
      fields: [
        {
          name: 'qualification',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'biography',
      type: 'textarea',
    },
    {
      name: 'photo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'detailedProfile',
      type: 'relationship',
      admin: {
        description: 'A reviewed CV or detailed-profile document from the Media collection.',
      },
      relationTo: 'media',
    },
    {
      name: 'vidwanId',
      type: 'text',
      admin: {
        description: 'The identifier from the national VIDWAN expert database.',
      },
      index: true,
      unique: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Order within the faculty member’s department.',
      },
      min: 0,
      required: true,
    },
  ],
  labels: {
    plural: 'Faculty',
    singular: 'Faculty member',
  },
  versions: {
    drafts: true,
  },
}
