import type { Metadata } from 'next'

import { findPeopleByType } from '@/frontend/data/people'
import { PeopleCategoryTemplate } from '@/frontend/templates/PeopleCategoryTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/people/governance' },
  title: 'Governing body',
}

export default async function GovernancePage() {
  return (
    <PeopleCategoryTemplate
      heading="Governing body"
      people={await findPeopleByType('governance')}
    />
  )
}
