import type { ReactNode } from 'react'

import { findSafeHref } from '@/frontend/data/urls'
import type { CmsLinkData } from '@/frontend/types'

const pageHref = (page: CmsLinkData['page']): string | undefined => {
  if (!page || typeof page === 'number') return undefined
  return `/${page.slug.replace(/^\/+/, '')}`
}

const documentHref = (document: CmsLinkData['document']): string | undefined => {
  if (!document || typeof document === 'number') return undefined
  return findSafeHref(document.url || document.legacyUrl)
}

export const findLinkHref = (link: CmsLinkData): string | undefined => {
  switch (link.destinationType) {
    case 'page':
      return pageHref(link.page)
    case 'internal-path':
      return findSafeHref(link.internalPath)
    case 'external-url':
      return findSafeHref(link.externalUrl)
    case 'document':
      return documentHref(link.document)
    case 'none':
      return undefined
  }
}

export function CmsLink({
  children,
  className,
  link,
}: {
  children: ReactNode
  className?: string
  link: CmsLinkData
}) {
  const href = findLinkHref(link)

  if (!href) return <>{children}</>

  return (
    <a
      className={className}
      href={href}
      rel={link.openInNewTab ? 'noreferrer noopener' : undefined}
      target={link.openInNewTab ? '_blank' : undefined}
    >
      {children}
    </a>
  )
}
