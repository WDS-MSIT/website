import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Departments } from './collections/Departments'
import { Committees } from './collections/Committees'
import { Faculty } from './collections/Faculty'
import { Facilities } from './collections/Facilities'
import { Users } from './collections/Users'
import { Media } from './collections/Media'

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
        secretAccessKey: requiredEnv('S3_SECRET_ACCESS_KEY'),
      }
    : null

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Departments, Faculty, Media, Committees, Facilities],
  editor: lexicalEditor(),
  graphQL: {
    disable: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
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
      enabled: storage !== null,
      collections: {
        media: true,
      },
      bucket: storage?.bucket || '',
      config: {
        credentials: {
          accessKeyId: storage?.accessKeyId || '',
          secretAccessKey: storage?.secretAccessKey || '',
        },
        endpoint: storage?.endpoint,
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
        region: process.env.S3_REGION || 'auto',
      },
    }),
  ],
})
