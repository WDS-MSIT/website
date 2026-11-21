import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findUpdateBySlug } from '@/frontend/data/updates'
import { UpdateTemplate } from '@/frontend/templates/UpdateTemplate'
type Props = { params: Promise<{ slug: string }> }
const findUpdate = async (params: Props['params']) => findUpdateBySlug((await params).slug)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const update = await findUpdate(params)
  return update
    ? {
        alternates: { canonical: `/updates/${update.slug}` },
        description: update.excerpt || undefined,
        title: update.title,
      }
    : {}
}
export default async function UpdatePage({ params }: Props) {
  const update = await findUpdate(params)
  if (!update) notFound()
  return <UpdateTemplate update={update} />
}
