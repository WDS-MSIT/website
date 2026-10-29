import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const Programmes: CollectionConfig = {
  slug: 'programmes',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'code', 'department', 'level', 'reviewStatus', '_status'],
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
              name: 'shortName',
              type: 'text',
            },
            {
              name: 'code',
              type: 'text',
              index: true,
              required: true,
              unique: true,
            },
            {
              name: 'slug',
              type: 'text',
              index: true,
              required: true,
              unique: true,
            },
            {
              name: 'degree',
              type: 'text',
              required: true,
            },
            {
              name: 'level',
              type: 'select',
              options: [
                { label: 'Undergraduate', value: 'undergraduate' },
                { label: 'Postgraduate', value: 'postgraduate' },
                { label: 'Doctoral', value: 'doctoral' },
              ],
              required: true,
            },
            {
              name: 'department',
              type: 'relationship',
              relationTo: 'departments',
              required: true,
            },
            {
              name: 'durationYears',
              type: 'number',
              admin: {
                description: 'Leave blank until the programme duration is confirmed by a source.',
              },
              max: 10,
              min: 1,
            },
            {
              name: 'description',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Intake',
          fields: [
            {
              name: 'intakes',
              type: 'array',
              admin: {
                description:
                  'Keep historical intake claims as separate rows instead of overwriting them.',
              },
              fields: [
                {
                  name: 'academicYear',
                  type: 'text',
                  admin: {
                    description: 'Leave blank when the source does not identify an academic year.',
                  },
                },
                {
                  name: 'shift',
                  type: 'select',
                  defaultValue: 'unspecified',
                  options: [
                    { label: 'Unspecified', value: 'unspecified' },
                    { label: 'First shift', value: 'first' },
                    { label: 'Second shift', value: 'second' },
                    { label: 'Combined', value: 'combined' },
                  ],
                  required: true,
                },
                {
                  name: 'seats',
                  type: 'number',
                  min: 0,
                  required: true,
                },
                {
                  name: 'sourceNote',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Outcomes',
          fields: [
            {
              name: 'educationalObjectives',
              type: 'array',
              label: 'Programme educational objectives',
              fields: [
                {
                  name: 'code',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'statement',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'programmeOutcomes',
              type: 'array',
              fields: [
                {
                  name: 'code',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'statement',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'programmeSpecificOutcomes',
              type: 'array',
              fields: [
                {
                  name: 'code',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'statement',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Curriculum & accreditation',
          fields: [
            {
              name: 'documents',
              type: 'relationship',
              hasMany: true,
              relationTo: 'documents',
            },
            {
              name: 'legacyResources',
              type: 'array',
              admin: {
                description:
                  'Temporary source links until programme files and folders are reviewed and migrated.',
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
                {
                  name: 'type',
                  type: 'select',
                  defaultValue: 'other',
                  options: [
                    { label: 'Programme outcomes', value: 'programme-outcomes' },
                    { label: 'Scheme', value: 'scheme' },
                    { label: 'Syllabus', value: 'syllabus' },
                    { label: 'Lesson plan', value: 'lesson-plan' },
                    { label: 'CO–PO–PSO mapping', value: 'outcome-mapping' },
                    { label: 'Assignments', value: 'assignments' },
                    { label: 'Notes', value: 'notes' },
                    { label: 'Question papers', value: 'question-papers' },
                    { label: 'Question bank', value: 'question-bank' },
                    { label: 'Other', value: 'other' },
                  ],
                  required: true,
                },
              ],
            },
            {
              name: 'accreditations',
              type: 'array',
              admin: {
                description:
                  'Record validity and evidence before changing a source claim into a verified accreditation.',
              },
              fields: [
                {
                  name: 'accreditingBody',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'accreditationStatus',
                  type: 'select',
                  defaultValue: 'claimed',
                  options: [
                    { label: 'Claimed by source', value: 'claimed' },
                    { label: 'Verified as accredited', value: 'accredited' },
                    { label: 'Expired', value: 'expired' },
                    { label: 'Not accredited', value: 'not-accredited' },
                  ],
                  required: true,
                },
                {
                  name: 'validFrom',
                  type: 'date',
                },
                {
                  name: 'validUntil',
                  type: 'date',
                },
                {
                  name: 'evidence',
                  type: 'relationship',
                  hasMany: true,
                  relationTo: 'documents',
                },
                {
                  name: 'legacyEvidence',
                  type: 'array',
                  dbName: 'links',
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
                  name: 'note',
                  type: 'textarea',
                },
              ],
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
              index: true,
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
