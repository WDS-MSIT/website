import Link from 'next/link'
import type { ReactNode } from 'react'

import type { NavLink } from '@/frontend/data/site-navigation'

// Internal paths use Next.js client navigation; external ones open in a new tab.
export function SiteLink({
  link,
  className,
  children,
  onClick,
}: {
  link: NavLink
  className?: string
  children?: ReactNode
  onClick?: () => void
}) {
  if (link.external) {
    return (
      <a
        className={className}
        href={link.href}
        onClick={onClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children ?? link.label}
      </a>
    )
  }

  return (
    <Link className={className} href={link.href} onClick={onClick}>
      {children ?? link.label}
    </Link>
  )
}
