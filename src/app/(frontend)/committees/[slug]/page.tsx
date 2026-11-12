import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCommitteeBySlug } from '@/frontend/data/committees'
import { CommitteeTemplate } from '@/frontend/templates/CommitteeTemplate'
type Props = { params: Promise<{ slug: string }> }
const findCommittee = async (params: Props['params']) => findCommitteeBySlug((await params).slug)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const committee = await findCommittee(params)
  return committee
    ? { alternates: { canonical: `/committees/${committee.slug}` }, title: committee.name }
    : {}
}
export default async function CommitteePage({ params }: Props) {
  const committee = await findCommittee(params)
  if (!committee) notFound()
  return <CommitteeTemplate committee={committee} />
}
