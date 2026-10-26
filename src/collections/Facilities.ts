import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Facilities: CollectionConfig = {
  slug: 'facilities',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'type', 'department', 'sortOrder', '_status'],
    useAsTitle: 'name',
  },
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
      name: 'type',
      type: 'select',
      options: [
        'laboratory',
        'library',
        'hostel',
        'staff-accommodation',
        'canteen',
        'sports',
        'medical',
        'bank',
      ],
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'General introduction and services for this facility.',
      },
    },
    {
      name: 'lab',
      type: 'group',
      label: 'Laboratory details',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'laboratory',
      },
      fields: [
        {
          name: 'equipment',
          type: 'richText',
          label: 'System configuration / equipment',
        },
        {
          name: 'descriptions',
          type: 'array',
          label: 'Lab descriptions',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
            },
          ],
        },
        {
          name: 'subjects',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'code',
              type: 'text',
            },
            {
              name: 'classSemester',
              type: 'text',
              label: 'Class / branch / semester',
            },
          ],
        },
        {
          name: 'software',
          type: 'array',
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
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
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
      name: 'location',
      type: 'text',
      admin: {
        description: 'An explicit room or facility location from the source.',
      },
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
      name: 'sortOrder',
      type: 'number',
      min: 0,
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
      name: 'legacyPath',
      type: 'text',
      index: true,
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  defaultSort: 'sortOrder',
}
