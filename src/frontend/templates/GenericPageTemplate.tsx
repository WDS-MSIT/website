import { PageBlocks } from '@/frontend/components/blocks/PageBlocks'
import type { Page } from '@/payload-types'

export function GenericPageTemplate({ page }: { page: Page }) {
  return (
    <article className="generic-page">
      <header className="page-header">
        <h1>{page.title}</h1>
        {page.summary ? <p>{page.summary}</p> : null}
      </header>
      {page.content?.length ? <PageBlocks blocks={page.content} /> : null}
    </article>
  )
}
