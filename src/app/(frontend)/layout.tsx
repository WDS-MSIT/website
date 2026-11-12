import type { Metadata } from 'next'
import React from 'react'

import { SiteFooter } from '@/frontend/components/SiteFooter'
import { SiteHeader } from '@/frontend/components/SiteHeader'
import { findSiteSettings } from '@/frontend/data/site'
import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  const site = await findSiteSettings()

  return {
    description: site.affiliationSummary || undefined,
    title: {
      default: site.instituteName,
      template: `%s | ${site.instituteName}`,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await findSiteSettings()

  return (
    <html lang="en">
      <body>
        <SiteHeader site={site} />
        <main id="main-content">{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  )
}
