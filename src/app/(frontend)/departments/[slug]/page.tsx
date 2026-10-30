import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { findDepartmentBySlug } from '@/frontend/data/departments'
import { DepartmentTemplate } from '@/frontend/templates/DepartmentTemplate'

type DepartmentPageProps = {
  params: Promise<{
    slug: string
  }>
}

const findDepartment = async (params: DepartmentPageProps['params']) => {
  const { slug } = await params
  return findDepartmentBySlug(slug)
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const result = await findDepartment(params)

  if (!result) return {}

  return {
    alternates: {
      canonical: `/departments/${result.department.slug}`,
    },
    description: result.department.overview,
    title: result.department.name,
  }
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const result = await findDepartment(params)

  if (!result) notFound()

  return <DepartmentTemplate {...result} />
}
