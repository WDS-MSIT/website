import type { CollectionConfig } from 'payload'

import { publishedOrSuperadmin } from '@/access/content'
import { superadminOnly } from '@/access/users'

export const PlacementYears: CollectionConfig = {
  slug: 'placement-years',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: publishedOrSuperadmin,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: [
      'year',
      'placementStatus',
      'offerCount',
      'highestPackageLpa',
      'reviewStatus',
      '_status',
    ],
    useAsTitle: 'year',
  },
  defaultSort: '-year',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Placement year',
          fields: [
            {
              name: 'year',
              type: 'number',
              admin: {
                description: 'The graduating batch or placement year used by the source.',
              },
              index: true,
              min: 2000,
              required: true,
              unique: true,
            },
            {
              name: 'placementStatus',
              type: 'select',
              defaultValue: 'final',
              options: [
                { label: 'Final', value: 'final' },
                { label: 'Ongoing', value: 'ongoing' },
              ],
              required: true,
            },
            {
              name: 'statisticsAsOf',
              type: 'date',
              admin: {
                description:
                  'Especially important for ongoing years. Leave blank when the source gives no as-of date.',
              },
            },
            {
              name: 'narrativeNotes',
              type: 'textarea',
              admin: {
                description: 'Reviewed context that belongs to this year rather than the general Placements page.',
              },
            },
          ],
        },
        {
          label: 'Statistics',
          fields: [
            {
              name: 'offerCount',
              type: 'number',
              admin: {
                description:
                  'Number of offers. The legacy table calls this “Job Heads”; confirm that interpretation before publishing.',
              },
              min: 0,
            },
            {
              name: 'highestPackageLpa',
              type: 'number',
              admin: {
                description: 'Highest annual package in lakh rupees per annum (LPA).',
              },
              min: 0,
            },
            {
              name: 'medianPackageLpa',
              type: 'number',
              admin: {
                description: 'Median annual package in lakh rupees per annum (LPA).',
              },
              min: 0,
            },
            {
              name: 'averagePackageLpa',
              type: 'number',
              admin: {
                description: 'Average annual package in lakh rupees per annum (LPA).',
              },
              min: 0,
            },
            {
              name: 'statisticsNote',
              type: 'textarea',
              admin: {
                description: 'Uncertainty, calculation basis, or other qualifications for these figures.',
              },
            },
          ],
        },
        {
          label: 'Evidence',
          fields: [
            {
              name: 'evidenceDocuments',
              type: 'relationship',
              hasMany: true,
              relationTo: 'documents',
              admin: {
                description: 'Reviewed placement reports after they are migrated into Documents.',
              },
            },
            {
              name: 'legacyEvidence',
              type: 'array',
              admin: {
                description:
                  'Temporary source links retained until placement reports are reviewed and moved into Documents.',
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
              name: 'reviewedAt',
              type: 'date',
              admin: {
                description: 'When an editor last verified the figures against their evidence.',
              },
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
        },
      ],
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
