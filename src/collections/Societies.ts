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
    defaultColumns: ['name', 'category', 'reviewStatus', 'sortOrder', '_status'],
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
      defaultValue: 'unclassified',
      admin: {
        description: 'Assign this during review; the source page does not state categories.',
      },
      options: [
        { label: 'Unclassified', value: 'unclassified' },
        { label: 'Academic', value: 'academic' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Service', value: 'service' },
        { label: 'Technical', value: 'technical' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'overview',
      type: 'textarea',
      admin: {
        description:
          'Short summary shown on listing cards. Imported summaries are verbatim excerpts.',
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
      name: 'externalLinks',
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
          options: ['website', 'social', 'form', 'other'],
        },
      ],
    },
    {
      name: 'documents',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
      admin: {
        description: 'Reviewed supporting documents for this society.',
      },
    },
    {
      name: 'legacyDocuments',
      type: 'array',
      admin: {
        description: 'Temporary source links until these files are migrated into Documents.',
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
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
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
  ],
  defaultSort: 'sortOrder',
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
