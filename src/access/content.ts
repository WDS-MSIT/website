import type { Access } from 'payload'

import { isActiveSuperadmin } from '@/auth/roles'

export const publishedOrSuperadmin: Access = ({ req }) => {
  if (isActiveSuperadmin(req.user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
