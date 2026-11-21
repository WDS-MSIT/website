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
      <head>
        {/* Inter for body text, Libre Baskerville for headings. Loaded by name (not next/font)
            because the design refers to them by name, e.g. font-[Libre_Baskerville,serif]. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* This is the frontend's root layout, so the fonts load on every public page; the rule
            targets the Pages Router's per-page <Head>. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
        />
      </head>
      <body>
        <SiteHeader site={site} />
        <main id="main-content">{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  )
}
