import type { Metadata } from 'next'
import { findCommittees } from '@/frontend/data/committees'
import { CommitteeIndexTemplate } from '@/frontend/templates/CommitteeIndexTemplate'
export const metadata: Metadata = { alternates: { canonical: '/committees' }, title: 'Committees' }
export default async function CommitteesPage() {
  return <CommitteeIndexTemplate committees={await findCommittees()} />
}
