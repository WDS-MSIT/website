import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { findProgrammeBySlug } from '@/frontend/data/programmes'
import { ProgrammeTemplate } from '@/frontend/templates/ProgrammeTemplate'

type ProgrammePageProps = { params: Promise<{ slug: string }> }

const findProgramme = async (params: ProgrammePageProps['params']) => {
  const { slug } = await params
  return findProgrammeBySlug(slug)
}

export async function generateMetadata({ params }: ProgrammePageProps): Promise<Metadata> {
  const programme = await findProgramme(params)
  if (!programme) return {}

  return {
    alternates: { canonical: `/programmes/${programme.slug}` },
    description: `${programme.degree} programme at Maharaja Surajmal Institute of Technology.`,
    title: programme.name,
  }
}

export default async function ProgrammePage({ params }: ProgrammePageProps) {
  const programme = await findProgramme(params)
  if (!programme) notFound()

  return <ProgrammeTemplate programme={programme} />
}
