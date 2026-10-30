/* eslint-disable @next/next/no-img-element */
// NOTE: Plain images allow reviewed legacy CMS URLs without maintaining a host allow-list.

import { findSafeResourceUrl } from '@/frontend/data/urls'
import type { Media } from '@/payload-types'

export function CmsImage({
  alt,
  className,
  legacyUrl,
  media,
}: {
  alt: string
  className?: string
  legacyUrl?: null | string
  media?: Media | null | number
}) {
  const source = media && typeof media === 'object' ? media.url : undefined
  const src = findSafeResourceUrl(source || legacyUrl)

  if (!src) return null

  return (
    <img
      alt={media && typeof media === 'object' ? media.alt || alt : alt}
      className={className}
      src={src}
    />
  )
}
