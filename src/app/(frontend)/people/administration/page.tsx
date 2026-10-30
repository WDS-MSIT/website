import type { Metadata } from 'next'

import { findPeopleByType } from '@/frontend/data/people'
import { PeopleCategoryTemplate } from '@/frontend/templates/PeopleCategoryTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/people/administration' },
  title: 'Administration',
}

export default async function AdministrationPage() {
  return (
    <PeopleCategoryTemplate
      heading="Administration"
      people={await findPeopleByType('administration')}
    />
  )
}
