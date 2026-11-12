import type { Metadata } from 'next'

import { findPeopleByType } from '@/frontend/data/people'
import { PeopleCategoryTemplate } from '@/frontend/templates/PeopleCategoryTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/people/leadership' },
  title: 'From the desk',
}

export default async function LeadershipPage() {
  return (
    <PeopleCategoryTemplate heading="From the desk" people={await findPeopleByType('leadership')} />
  )
}
