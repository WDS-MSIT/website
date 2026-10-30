import { CmsImage } from '@/frontend/components/CmsImage'
import type { PageMediaBlock } from '@/payload-types'

export function MediaBlock({ block }: { block: PageMediaBlock }) {
  if (!block.image && !block.legacyImageUrl) return null

  return (
    <figure className="page-media">
      <CmsImage alt={block.caption || ''} legacyUrl={block.legacyImageUrl} media={block.image} />
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  )
}
