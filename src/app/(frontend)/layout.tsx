import type { Metadata, Viewport } from 'next'
import React from 'react'

import '@/website/index.css'

// The public site is the MSIT website (src/website), carried over as is. Its own Header and Footer
// come from the website's Layout, and each page sets its own title through react-helmet-async.
export const metadata: Metadata = {
  title: 'Maharaja Surajmal Institute of Technology | MSIT Delhi',
  description:
    'Official website of Maharaja Surajmal Institute of Technology (MSIT), a premier engineering college in Delhi affiliated with GGSIPU.',
  icons: { icon: '/msit-logo.webp', apple: '/msit-logo.webp' },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = { themeColor: '#ffffff' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Inter for body text, Libre Baskerville for headings, as in the website's index.html. */}
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
      <body>{children}</body>
    </html>
  )
}
