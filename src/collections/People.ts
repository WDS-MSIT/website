import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

const personTypes = [
  { label: 'Faculty', value: 'faculty' },
  { label: 'Leadership', value: 'leadership' },
  { label: 'Administration', value: 'administration' },
  { label: 'Technical staff', value: 'technical-staff' },
  { label: 'Library staff', value: 'library-staff' },
  { label: 'Placement staff', value: 'placement-staff' },
  { label: 'Governance or advisory', value: 'governance' },
  { label: 'Committee member', value: 'committee-member' },
  { label: 'Society member', value: 'society-member' },
  { label: 'Student', value: 'student' },
  { label: 'External member', value: 'external' },
]

export const People: CollectionConfig = {
  slug: 'people',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'personTypes', 'primaryDesignation', 'departments', '_status'],
    useAsTitle: 'name',
  },
  defaultSort: 'name',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
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
              name: 'personTypes',
              type: 'select',
              hasMany: true,
              options: personTypes,
              required: true,
            },
            {
              name: 'primaryDesignation',
              type: 'text',
              admin: {
                description: 'The main public designation used on profile and listing cards.',
              },
            },
            {
              name: 'departments',
              type: 'relationship',
              hasMany: true,
              relationTo: 'departments',
              admin: {
                description: 'Optional because leadership, staff, students and external members may not belong to a department.',
              },
            },
            {
              name: 'sortOrder',
              type: 'number',
              admin: {
                description: 'Default order when this person appears in a general people listing.',
              },
              min: 0,
            },
          ],
        },
        {
          label: 'Roles',
          fields: [
            {
              name: 'roles',
              type: 'array',
              admin: {
                description: 'A person may hold several roles across departments, committees, societies or institute leadership.',
              },
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: personTypes,
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'Examples: Associate Professor, Director, Convener or Student Coordinator.',
                  },
                },
                {
                  name: 'context',
                  type: 'text',
                  admin: {
                    description: 'The committee, society, office, organisation or other context for this role.',
                  },
                },
                {
                  name: 'department',
                  type: 'relationship',
                  relationTo: 'departments',
                },
                {
                  name: 'sourceUrl',
                  type: 'text',
                  admin: {
                    hidden: true,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Profile',
          fields: [
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
              name: 'phone',
              type: 'text',
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
              name: 'legacyPhotoUrl',
              type: 'text',
              admin: {
                description: 'Temporary source image until it is reviewed and migrated into Media.',
              },
            },
            {
              name: 'detailedProfile',
              type: 'relationship',
              relationTo: 'documents',
              admin: {
                description: 'Reviewed CV or detailed profile document.',
              },
            },
            {
              name: 'legacyProfileUrl',
              type: 'text',
              admin: {
                description: 'Temporary source document until it is reviewed and migrated into Documents.',
              },
            },
            {
              name: 'vidwanId',
              type: 'text',
              admin: {
                description: 'Identifier from the national VIDWAN expert database.',
              },
              index: true,
              unique: true,
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
              name: 'sourceReferences',
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
                  name: 'snapshotFile',
                  type: 'text',
                  required: true,
                },
              ],
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
