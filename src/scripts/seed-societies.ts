import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'
import { seedSocieties } from '@/seed/societies'

const seed = async (): Promise<void> => {
  const payload = await getPayload({ config })

  try {
    await seedSocieties(payload)
  } finally {
    await payload.destroy()
  }

  // Payload's logger keeps a worker handle open after destroy, so end the script explicitly.
  process.exit(0)
}

await seed()
