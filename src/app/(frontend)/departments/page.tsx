import type { Metadata } from 'next'

import { findDepartments } from '@/frontend/data/departments'
import { DepartmentIndexTemplate } from '@/frontend/templates/DepartmentIndexTemplate'

export const metadata: Metadata = {
  alternates: {
    canonical: '/departments',
  },
  title: 'Departments',
}

export default async function DepartmentsPage() {
  const departments = await findDepartments()

  return <DepartmentIndexTemplate departments={departments} />
}
