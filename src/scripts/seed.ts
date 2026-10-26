import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'
import { seedDepartments } from '@/seed/departments'
import { seedFaculty } from '@/seed/faculty'

const requiredEnv = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required`)
  }

  return value
}

const seed = async (): Promise<void> => {
  const email = requiredEnv('SUPERADMIN_EMAIL')
  const name = requiredEnv('SUPERADMIN_NAME')
  const password = requiredEnv('SUPERADMIN_PASSWORD')
  const payload = await getPayload({ config })

  try {
    const existing = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
      where: {
        email: {
          equals: email,
        },
      },
    })

    const data: {
      active: boolean
      email: string
      name: string
      password: string
      role: 'superadmin'
    } = {
      active: true,
      email,
      name,
      password,
      role: 'superadmin',
    }

    if (existing.docs[0]) {
      await payload.update({
        id: existing.docs[0].id,
        collection: 'users',
        data,
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'users',
        data,
        overrideAccess: true,
      })
    }

    payload.logger.info(`Seeded superadmin ${email}`)
    await seedDepartments(payload)
    await seedFaculty(payload)
  } finally {
    await payload.destroy()
  }
}

await seed()
