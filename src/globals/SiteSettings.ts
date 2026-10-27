import type { GlobalConfig } from 'payload'

import { superadminOnly } from '@/access/users'
import { linkFields } from '@/fields/link'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  dbName: 'site',
  label: 'Site settings & navigation',
  access: {
    read: () => true,
    update: superadminOnly,
  },
  admin: {
    group: 'Site',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity & contact',
          fields: [
            {
              name: 'instituteName',
              type: 'text',
              required: true,
            },
            {
              name: 'logo',
              type: 'relationship',
              relationTo: 'media',
            },
            {
              name: 'legacyLogoUrl',
              type: 'text',
              admin: {
                description: 'Temporary source URL until the logo is migrated into Media.',
              },
            },
            {
              name: 'affiliationSummary',
              type: 'textarea',
              admin: {
                description:
                  'The affiliation, accreditation and approval line shown in the header.',
              },
            },
            {
              name: 'address',
              type: 'textarea',
            },
            {
              name: 'contactLines',
              type: 'array',
              admin: {
                description: 'Public contact lines such as reception, placement cell and email.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  admin: {
                    description: 'Optional tel: or mailto: destination.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Header & navigation',
          fields: [
            {
              name: 'utilityLinks',
              type: 'array',
              admin: {
                description: 'The compact institutional links shown above the main navigation.',
              },
              fields: linkFields(),
            },
            {
              name: 'primaryLinks',
              type: 'array',
              admin: {
                description: 'The main site navigation, in display order.',
              },
              fields: linkFields(),
            },
            {
              name: 'navigationGroups',
              type: 'array',
              admin: {
                description: 'Grouped links for audience menus, sidebars or expanded navigation.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: linkFields(),
                },
              ],
            },
            {
              name: 'announcements',
              type: 'array',
              admin: {
                description: 'Short site-wide messages. The frontend chooses how to present them.',
              },
              fields: [
                {
                  name: 'message',
                  type: 'textarea',
                  required: true,
                },
                ...linkFields({ allowNone: true, includeLabel: false }),
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              type: 'textarea',
              admin: {
                description:
                  'Copyright or institutional text. The frontend supplies the current year.',
              },
            },
            {
              name: 'footerLinks',
              type: 'array',
              fields: linkFields(),
            },
          ],
        },
        {
          label: 'Source review',
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
    max: 20,
  },
}
