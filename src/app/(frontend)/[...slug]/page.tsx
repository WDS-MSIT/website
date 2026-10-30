import type { Metadata } from 'next'
import { notFound, permanentRedirect, redirect } from 'next/navigation'

import { findPageBySlug } from '@/frontend/data/pages'
import { findRedirectByPath } from '@/frontend/data/redirects'
import { GenericPageTemplate } from '@/frontend/templates/GenericPageTemplate'

type GenericPageProps = {
  params: Promise<{
    slug: string[]
  }>
}

const findPage = async (params: GenericPageProps['params']) => {
  const { slug } = await params
  return findPageBySlug(slug.join('/'))
}

export async function generateMetadata({ params }: GenericPageProps): Promise<Metadata> {
  const page = await findPage(params)

  if (!page) return {}

  return {
    alternates: {
      canonical: `/${page.slug}`,
    },
    description: page.summary || undefined,
    title: page.title,
  }
}

export default async function GenericPage({ params }: GenericPageProps) {
  const resolvedParams = await params
  const page = await findPageBySlug(resolvedParams.slug.join('/'))

  if (!page) {
    const legacyRedirect = await findRedirectByPath(`/${resolvedParams.slug.join('/')}`)
    if (!legacyRedirect) notFound()

    if (legacyRedirect.permanent) permanentRedirect(legacyRedirect.destinationPath)
    redirect(legacyRedirect.destinationPath)
  }

  return <GenericPageTemplate page={page} />
}
