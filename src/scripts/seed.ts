import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'
import { seedDepartments } from '@/seed/departments'
import { seedEvents } from '@/seed/events'
import { seedFaculty } from '@/seed/faculty'
import { seedCommittees } from '@/seed/committees'
import { seedFacilities } from '@/seed/facilities'
import { seedHomepage } from '@/seed/homepage'
import { seedPages } from '@/seed/pages'
import { seedPlacementYears } from '@/seed/placement-years'
import { seedProgrammes } from '@/seed/programmes'
import { seedSiteSettings } from '@/seed/site-settings'
import { seedSocieties } from '@/seed/societies'
import { seedUpdates } from '@/seed/updates'

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
    await seedProgrammes(payload)
    await seedPlacementYears(payload)
    await seedFaculty(payload)
    await seedCommittees(payload)
    await seedFacilities(payload)
    await seedSocieties(payload)
    await seedEvents(payload)
    await seedUpdates(payload)
    await seedPages(payload)
    await seedSiteSettings(payload)
    await seedHomepage(payload)
  } finally {
    await payload.destroy()
  }

  // Payload's logger keeps a worker handle open after destroy, so end the script explicitly.
  process.exit(0)
}

await seed()
