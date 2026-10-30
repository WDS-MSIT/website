import { RichTextContent } from '@/frontend/components/RichTextContent'
import type { CalloutBlock as CalloutBlockData } from '@/payload-types'

export function CalloutBlock({ block }: { block: CalloutBlockData }) {
  return (
    <aside className={`callout callout-${block.tone}`}>
      {block.heading ? <h2>{block.heading}</h2> : null}
      <RichTextContent data={block.body} />
    </aside>
  )
}
