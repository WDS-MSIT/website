import { describe, expect, it } from 'vitest'

import { canManageUsers, superadminOnly } from '@/access/users'
import {
  assertAnotherActiveSuperadmin,
  blocksActiveSuperadminUpdate,
  protectLastSuperadminBeforeChange,
  protectLastSuperadminBeforeDelete,
} from '@/auth/protectSuperadmin'
import { Users } from '@/collections/Users'

describe('user account safety', () => {
  it('denies user creation without an authenticated superadmin', () => {
    expect(canManageUsers(null)).toBe(false)
    expect(Users.access?.create).toBe(superadminOnly)
  })

  it('denies user management to a non-superadmin', () => {
    const user = {
      active: true,
      role: 'site-manager',
    }

    expect(canManageUsers(user)).toBe(false)
    expect(Users.access?.create).toBe(superadminOnly)
    expect(Users.access?.read).toBe(superadminOnly)
    expect(Users.access?.update).toBe(superadminOnly)
    expect(Users.access?.delete).toBe(superadminOnly)
  })

  it('protects the last active superadmin from deletion, disabling, and demotion', () => {
    const superadmin = {
      active: true,
      role: 'superadmin',
    }

    expect(() => assertAnotherActiveSuperadmin(0)).toThrow(
      'The last active superadmin cannot be disabled, demoted, or deleted.',
    )
    expect(blocksActiveSuperadminUpdate(superadmin, undefined, false)).toBe(true)
    expect(blocksActiveSuperadminUpdate(superadmin, 'site-manager', undefined)).toBe(true)
    expect(Users.hooks?.beforeDelete).toContain(protectLastSuperadminBeforeDelete)
    expect(Users.hooks?.beforeChange).toContain(protectLastSuperadminBeforeChange)
  })
})
