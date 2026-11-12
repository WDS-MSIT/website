import type { Document, Page, Update } from '@/payload-types'

export type CmsLinkData = {
  destinationType: 'none' | 'page' | 'internal-path' | 'external-url' | 'document'
  document?: Document | number | null
  externalUrl?: string | null
  internalPath?: string | null
  openInNewTab?: boolean | null
  page?: Page | number | null
}

export type HomepageUpdateSection = {
  heading: string
  updates: Update[]
  viewAllPath?: string | null
}
