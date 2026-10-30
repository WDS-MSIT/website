import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findPlacementYear } from '@/frontend/data/placements'
import { PlacementTemplate } from '@/frontend/templates/PlacementTemplate'
type Props = { params: Promise<{ year: string }> }
const findPlacement = async (params: Props['params']) => {
  const year = Number((await params).year)
  return Number.isSafeInteger(year) ? findPlacementYear(year) : undefined
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const placement = await findPlacement(params)
  return placement
    ? {
        alternates: { canonical: `/placements/${placement.year}` },
        title: `Placements ${placement.year}`,
      }
    : {}
}
export default async function PlacementPage({ params }: Props) {
  const placement = await findPlacement(params)
  if (!placement) notFound()
  return <PlacementTemplate placement={placement} />
}
