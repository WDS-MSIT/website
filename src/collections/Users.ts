import type { CollectionConfig } from 'payload'

import { canAccessAdmin, superadminOnly } from '@/access/users'
import {
  preventDisabledUserLogin,
  protectLastSuperadminBeforeChange,
  protectLastSuperadminBeforeDelete,
} from '@/auth/protectSuperadmin'
import { userRoleOptions } from '@/auth/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: canAccessAdmin,
    create: superadminOnly,
    delete: superadminOnly,
    read: superadminOnly,
    update: superadminOnly,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'active'],
    useAsTitle: 'name',
  },
  auth: {
    lockTime: 15 * 60 * 1000,
    maxLoginAttempts: 5,
  },
  hooks: {
    beforeChange: [protectLastSuperadminBeforeChange],
    beforeDelete: [protectLastSuperadminBeforeDelete],
    beforeLogin: [preventDisabledUserLogin],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'contributor',
      options: userRoleOptions,
      required: true,
      saveToJWT: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      required: true,
      saveToJWT: true,
    },
  ],
}
