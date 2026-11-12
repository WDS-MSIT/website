import { RichText } from '@payloadcms/richtext-lexical/react'
import type { RichTextBlock } from '@/payload-types'

export function RichTextContent({ data }: { data: RichTextBlock['body'] }) {
  return <RichText className="rich-text" data={data} />
}
