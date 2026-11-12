import type { Metadata } from 'next'
import { findSocieties } from '@/frontend/data/societies'
import { SocietyIndexTemplate } from '@/frontend/templates/SocietyIndexTemplate'
export const metadata: Metadata = {
  alternates: { canonical: '/societies' },
  title: 'Student societies',
}
export default async function SocietiesPage() {
  return <SocietyIndexTemplate societies={await findSocieties()} />
}
