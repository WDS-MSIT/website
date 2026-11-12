import { findSafeResourceUrl } from '@/frontend/data/urls'
import type { EmbedBlock as EmbedBlockData } from '@/payload-types'

export function EmbedBlock({ block }: { block: EmbedBlockData }) {
  const url = findSafeResourceUrl(block.url)

  if (!url) return null

  return (
    <section className={`embed embed-${block.provider}`}>
      <h2>{block.title}</h2>
      <iframe
        allowFullScreen={block.provider === 'youtube'}
        loading="lazy"
        src={url}
        title={block.title}
      />
      <p>
        <a href={url}>Open {block.title}</a>
      </p>
    </section>
  )
}
