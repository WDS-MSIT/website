import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { findPageBySlug } from '@/frontend/data/pages'
import { GenericPageTemplate } from '@/frontend/templates/GenericPageTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/placements/internship-cell' },
  title: 'Internship Cell',
}

export default async function InternshipCellPage() {
  const page = await findPageBySlug('placements/internship-cell')
  if (!page) notFound()

  return <GenericPageTemplate page={page} />
}
