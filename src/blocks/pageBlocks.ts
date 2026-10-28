import type { Block } from 'payload'

import { linkFields } from '@/fields/link'

const RichTextBlock: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  labels: {
    plural: 'Rich text sections',
    singular: 'Rich text section',
  },
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
  ],
}

const CalloutBlock: Block = {
  slug: 'callout',
  interfaceName: 'CalloutBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'neutral',
      options: [
        { label: 'Neutral', value: 'neutral' },
        { label: 'Information', value: 'information' },
        { label: 'Important', value: 'important' },
      ],
      required: true,
    },
  ],
}

const LinkListBlock: Block = {
  slug: 'link-list',
  interfaceName: 'LinkListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'links',
      type: 'array',
      fields: linkFields(),
      minRows: 1,
      required: true,
    },
  ],
}

const DocumentListBlock: Block = {
  slug: 'document-list',
  interfaceName: 'DocumentListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'documents',
      type: 'relationship',
      hasMany: true,
      relationTo: 'documents',
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
  ],
}

const MediaBlock: Block = {
  slug: 'media',
  interfaceName: 'PageMediaBlock',
  fields: [
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'legacyImageUrl',
      type: 'text',
      admin: {
        description: 'Temporary source URL until the image is migrated into Media.',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

const TableBlock: Block = {
  slug: 'table',
  interfaceName: 'TableBlock',
  fields: [
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'A short accessible description of what the table contains.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
      ],
      minRows: 1,
      required: true,
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        {
          name: 'cells',
          type: 'array',
          fields: [
            {
              name: 'value',
              type: 'textarea',
              required: true,
            },
          ],
          required: true,
        },
      ],
      required: true,
    },
  ],
}

const EmbedBlock: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  fields: [
    {
      name: 'provider',
      type: 'select',
      options: [
        { label: 'Google Maps', value: 'google-maps' },
        { label: 'YouTube', value: 'youtube' },
      ],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Describes the embedded content for assistive technology.',
      },
      required: true,
    },
  ],
}

export const pageBlocks: Block[] = [
  RichTextBlock,
  CalloutBlock,
  LinkListBlock,
  DocumentListBlock,
  MediaBlock,
  TableBlock,
  EmbedBlock,
]
