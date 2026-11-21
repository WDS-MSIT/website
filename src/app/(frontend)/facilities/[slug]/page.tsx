import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { findFacilityBySlug } from '@/frontend/data/facilities'
import { FacilityTemplate } from '@/frontend/templates/FacilityTemplate'

type FacilityPageProps = { params: Promise<{ slug: string }> }

const findFacility = async (params: FacilityPageProps['params']) => {
  const { slug } = await params
  return findFacilityBySlug(slug)
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const facility = await findFacility(params)
  if (!facility) return {}

  return {
    alternates: { canonical: `/facilities/${facility.slug}` },
    title: facility.name,
  }
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const facility = await findFacility(params)
  if (!facility) notFound()

  return <FacilityTemplate facility={facility} />
}
