import type { Metadata } from 'next'

import { findCommittees } from '@/frontend/data/committees'
import { CommitteeIndexTemplate } from '@/frontend/templates/CommitteeIndexTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/committees/grievance-redressal' },
  title: 'Grievance redressal committees',
}

export default async function GrievanceRedressalPage() {
  const committees = (await findCommittees()).filter(
    (committee) => committee.legacyPath === '/advisory',
  )

  return <CommitteeIndexTemplate committees={committees} heading="Grievance redressal committees" />
}
