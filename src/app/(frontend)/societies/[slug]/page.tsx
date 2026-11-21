import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findSocietyBySlug } from '@/frontend/data/societies'
import { SocietyTemplate } from '@/frontend/templates/SocietyTemplate'
type Props = { params: Promise<{ slug: string }> }
const findSociety = async (params: Props['params']) => findSocietyBySlug((await params).slug)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const society = await findSociety(params)
  return society
    ? {
        alternates: { canonical: `/societies/${society.slug}` },
        description: society.overview || undefined,
        title: society.name,
      }
    : {}
}
export default async function SocietyPage({ params }: Props) {
  const society = await findSociety(params)
  if (!society) notFound()
  return <SocietyTemplate society={society} />
}
