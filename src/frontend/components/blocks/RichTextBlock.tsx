import { RichTextContent } from '@/frontend/components/RichTextContent'
import type { RichTextBlock as RichTextBlockData } from '@/payload-types'

export function RichTextBlock({ block }: { block: RichTextBlockData }) {
  return (
    <section className="content-section rich-text-section">
      <RichTextContent data={block.body} />
    </section>
  )
}
