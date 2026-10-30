import type { Metadata } from 'next'

import { findFacilities } from '@/frontend/data/facilities'
import { FacilityIndexTemplate } from '@/frontend/templates/FacilityIndexTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/facilities' },
  title: 'Facilities',
}

export default async function FacilitiesPage() {
  const facilities = await findFacilities()
  return <FacilityIndexTemplate facilities={facilities} />
}
