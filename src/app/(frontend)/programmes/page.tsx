import type { Metadata } from 'next'

import { findProgrammes } from '@/frontend/data/programmes'
import { ProgrammeIndexTemplate } from '@/frontend/templates/ProgrammeIndexTemplate'

export const metadata: Metadata = {
  alternates: { canonical: '/programmes' },
  title: 'Programmes',
}

export default async function ProgrammesPage() {
  const programmes = await findProgrammes()
  return <ProgrammeIndexTemplate programmes={programmes} />
}
