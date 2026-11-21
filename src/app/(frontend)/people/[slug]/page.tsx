import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { findPersonBySlug } from '@/frontend/data/people'
import { PersonTemplate } from '@/frontend/templates/PersonTemplate'

type PersonPageProps = { params: Promise<{ slug: string }> }

const findPerson = async (params: PersonPageProps['params']) => {
  const { slug } = await params
  return findPersonBySlug(slug)
}

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const person = await findPerson(params)
  if (!person) return {}

  return {
    alternates: { canonical: `/people/${person.slug}` },
    description: person.primaryDesignation || undefined,
    title: person.name,
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const person = await findPerson(params)
  if (!person) notFound()

  return <PersonTemplate person={person} />
}
