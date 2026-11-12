import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Departments } from './collections/Departments'
import { Committees } from './collections/Committees'
import { Documents } from './collections/Documents'
import { Events } from './collections/Events'
import { People } from './collections/People'
import { Facilities } from './collections/Facilities'
import { Societies } from './collections/Societies'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { PlacementYears } from './collections/PlacementYears'
import { Programmes } from './collections/Programmes'
import { Updates } from './collections/Updates'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const requiredEnv = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required when S3 storage is enabled`)
  }

  return value
}

const storage =
  process.env.S3_ENABLED === 'true'
    ? {
        accessKeyId: requiredEnv('S3_ACCESS_KEY_ID'),
        bucket: requiredEnv('S3_BUCKET'),
        endpoint: requiredEnv('S3_ENDPOINT'),
        publicUrl: process.env.S3_PUBLIC_URL?.replace(/\/$/, ''),
        secretAccessKey: requiredEnv('S3_SECRET_ACCESS_KEY'),
      }
    : null

const storageConfig = {
  credentials: {
    accessKeyId: storage?.accessKeyId || '',
    secretAccessKey: storage?.secretAccessKey || '',
  },
  endpoint: storage?.endpoint,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  region: process.env.S3_REGION || 'auto',
}

const createPublicFileUrl =
  (publicUrl: string) =>
  ({ filename, prefix }: { filename: string; prefix?: string }): string => {
    const key = prefix ? `${prefix}/${filename}` : filename
    return `${publicUrl}/${key}`
  }

const createEmailAdapter = () => {
  const apiKey = process.env.RESEND_API_KEY
  const defaultFromAddress = process.env.RESEND_FROM_ADDRESS

  if (!apiKey) return undefined

  if (!defaultFromAddress) {
    throw new Error('RESEND_FROM_ADDRESS is required when RESEND_API_KEY is configured')
  }

  return resendAdapter({
    apiKey,
    defaultFromAddress,
    defaultFromName: process.env.RESEND_FROM_NAME || 'MSIT CMS',
  })
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      description: 'MSIT website content management',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/msit-icon.png',
        },
      ],
      title: 'MSIT Content Management',
      titleSuffix: '— MSIT CMS',
    },
    components: {
      beforeLogin: ['/components/admin/LoginIntroduction'],
      graphics: {
        Icon: '/components/admin/MSITIcon',
        Logo: '/components/admin/MSITLogo',
      },
    },
  },
  collections: [
    Users,
    Pages,
    Departments,
    Programmes,
    PlacementYears,
    People,
    Media,
    Documents,
    Events,
    Committees,
    Facilities,
    Societies,
    Updates,
  ],
  globals: [SiteSettings, Homepage],
  email: createEmailAdapter(),
  editor: lexicalEditor(),
  graphQL: {
    disable: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      alwaysInsertFields: true,
      enabled: storage !== null,
      collections: {
        media: storage?.publicUrl
          ? {
              disablePayloadAccessControl: true,
              generateFileURL: createPublicFileUrl(storage.publicUrl),
              prefix: 'media',
            }
          : {
              prefix: 'media',
            },
      },
      bucket: storage?.bucket || '',
      config: storageConfig,
    }),
    s3Storage({
      alwaysInsertFields: true,
      enabled: storage !== null,
      clientUploads: true,
      collections: {
        documents: storage?.publicUrl
          ? {
              disablePayloadAccessControl: true,
              generateFileURL: createPublicFileUrl(storage.publicUrl),
              prefix: 'documents',
            }
          : {
              prefix: 'documents',
            },
      },
      bucket: storage?.bucket || '',
      config: storageConfig,
    }),
  ],
})
