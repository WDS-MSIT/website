'use client'

// Runs the MSIT website (the same code as msit-website.netlify.app) inside this Next.js app.
// The website is a browser app with its own router, so it renders in the browser only.
// TODO: Swap sections over to CMS data as the CMS gains the matching fields.

import dynamic from 'next/dynamic'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

const App = dynamic(() => import('./App'), { ssr: false })

export default function WebsiteRoot() {
  return (
    <StrictMode>
      <HelmetProvider>
        <div id="root">
          <App />
        </div>
      </HelmetProvider>
    </StrictMode>
  )
}
