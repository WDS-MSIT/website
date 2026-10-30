import type { Metadata } from 'next'
import { findPlacementYears } from '@/frontend/data/placements'
import { PlacementIndexTemplate } from '@/frontend/templates/PlacementIndexTemplate'
export const metadata: Metadata = { alternates: { canonical: '/placements' }, title: 'Placements' }
export default async function PlacementsPage() {
  return <PlacementIndexTemplate years={await findPlacementYears()} />
}
