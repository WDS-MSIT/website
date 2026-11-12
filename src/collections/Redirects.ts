import type { CollectionConfig, TextFieldSingleValidation } from 'payload'

import { superadminOnly } from '@/access/users'

const validateSourcePath: TextFieldSingleValidation = (value) => {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('?') ||
    value.includes('#')
  ) {
    return 'Enter a local path beginning with / and omit domains, query strings, and fragments.'
  }

  return true
}

const validateDestinationPath: TextFieldSingleValidation = (value, { siblingData }) => {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) {
    return 'Enter a local destination beginning with /, not a full or protocol-relative URL.'
  }
  const sourcePath =
    siblingData && typeof siblingData === 'object' && 'sourcePath' in siblingData
      ? siblingData.sourcePath
      : undefined
  if (value === sourcePath) return 'Source and destination paths must differ.'

  return true
}

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  access: {
    create: superadminOnly,
    delete: superadminOnly,
    read: superadminOnly,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['sourcePath', 'destinationPath', 'permanent', 'active'],
    useAsTitle: 'sourcePath',
  },
  fields: [
    {
      name: 'sourcePath',
      type: 'text',
      admin: {
        description: 'An old local path beginning with /, without a domain or query string.',
      },
      index: true,
      required: true,
      unique: true,
      validate: validateSourcePath,
    },
    {
      name: 'destinationPath',
      type: 'text',
      admin: {
        description:
          'The canonical local destination beginning with /. Redirect loops are rejected.',
      },
      required: true,
      validate: validateDestinationPath,
    },
    {
      name: 'permanent',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      required: true,
    },
    {
      name: 'note',
      type: 'textarea',
    },
  ],
}
