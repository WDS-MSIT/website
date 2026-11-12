import { CalloutBlock } from '@/frontend/components/blocks/CalloutBlock'
import { DocumentListBlock } from '@/frontend/components/blocks/DocumentListBlock'
import { EmbedBlock } from '@/frontend/components/blocks/EmbedBlock'
import { LinkListBlock } from '@/frontend/components/blocks/LinkListBlock'
import { MediaBlock } from '@/frontend/components/blocks/MediaBlock'
import { RichTextBlock } from '@/frontend/components/blocks/RichTextBlock'
import { TableBlock } from '@/frontend/components/blocks/TableBlock'
import type { Page } from '@/payload-types'

export function PageBlocks({ blocks }: { blocks: NonNullable<Page['content']> }) {
  return blocks.map((block, index) => {
    const key = block.id || `${block.blockType}-${index}`

    switch (block.blockType) {
      case 'rich-text':
        return <RichTextBlock block={block} key={key} />
      case 'callout':
        return <CalloutBlock block={block} key={key} />
      case 'link-list':
        return <LinkListBlock block={block} key={key} />
      case 'document-list':
        return <DocumentListBlock block={block} key={key} />
      case 'media':
        return <MediaBlock block={block} key={key} />
      case 'table':
        return <TableBlock block={block} key={key} />
      case 'embed':
        return <EmbedBlock block={block} key={key} />
    }
  })
}
