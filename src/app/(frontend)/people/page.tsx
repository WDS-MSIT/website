import type { Metadata } from 'next'

import { findPeople } from '@/frontend/data/people'
import { PeopleIndexTemplate } from '@/frontend/templates/PeopleIndexTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/people' },
  title: 'People',
}

export default async function PeoplePage() {
  const people = await findPeople()
  return <PeopleIndexTemplate people={people} />
}
