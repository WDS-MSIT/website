import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Societies: CollectionConfig = {
  slug: 'societies',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'category', 'sortOrder', '_status'],
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
      name: 'category',
      type: 'select',
      admin: {
        description: 'Editorial classification. The source page does not state a category.',
      },
      options: ['cultural', 'technical', 'academic'],
      required: true,
    },
    {
      name: 'overview',
      type: 'textarea',
      admin: {
        description: 'Short summary shown on listing cards. Imported summaries are verbatim excerpts.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Full society profile from the source page.',
      },
    },
    {
      name: 'foundedOn',
      type: 'date',
      admin: {
        description: 'Use only when the source gives a full date.',
      },
    },
    {
      name: 'foundedYear',
      type: 'number',
      admin: {
        description: 'Use only when the source gives a year but no full date.',
      },
      max: 2100,
      min: 1900,
    },
    {
      name: 'facultyCoordinators',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'designation',
          type: 'text',
        },
        {
          name: 'department',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'faculty',
          type: 'relationship',
          relationTo: 'faculty',
        },
      ],
    },
    {
      name: 'studentLeaders',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'unit',
          type: 'text',
          admin: {
            description: 'Sub-society or department, when the source states one.',
          },
        },
        {
          name: 'department',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'emails',
          type: 'array',
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
          ],
        },
        {
          name: 'phone',
          type: 'text',
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
        {
          name: 'type',
          type: 'select',
          defaultValue: 'other',
          options: ['website', 'social', 'document', 'form', 'other'],
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
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
  defaultSort: 'sortOrder',
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
