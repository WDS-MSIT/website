import type { Field } from 'payload'

type LinkFieldOptions = {
  allowNone?: boolean
  includeLabel?: boolean
}

const hasDestinationType = (siblingData: unknown, destinationType: string): boolean => {
  if (!siblingData || typeof siblingData !== 'object' || !('destinationType' in siblingData)) {
    return false
  }

  return siblingData.destinationType === destinationType
}

export const linkFields = ({
  allowNone = false,
  includeLabel = true,
}: LinkFieldOptions = {}): Field[] => {
  const destinationOptions = [
    { label: 'Page', value: 'page' },
    { label: 'Internal path', value: 'internal-path' },
    { label: 'External URL', value: 'external-url' },
    { label: 'Document', value: 'document' },
  ]

  if (allowNone) {
    destinationOptions.unshift({ label: 'No link', value: 'none' })
  }

  const fields: Field[] = []

  if (includeLabel) {
    fields.push({
      name: 'label',
      type: 'text',
      required: true,
    })
  }

  fields.push(
    {
      name: 'destinationType',
      type: 'select',
      defaultValue: allowNone ? 'none' : 'internal-path',
      options: destinationOptions,
      required: true,
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (_data, siblingData) => hasDestinationType(siblingData, 'page'),
      },
    },
    {
      name: 'internalPath',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => hasDestinationType(siblingData, 'internal-path'),
        description: 'A site path beginning with /, such as /contact.',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => hasDestinationType(siblingData, 'external-url'),
      },
    },
    {
      name: 'document',
      type: 'relationship',
      relationTo: 'documents',
      admin: {
        condition: (_data, siblingData) => hasDestinationType(siblingData, 'document'),
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  )

  return fields
}
