import type { Access } from 'payload'

import { isActiveSuperadmin, isActiveUser } from '@/auth/roles'

export const canAccessAdmin = ({ req }: Parameters<Access>[0]): boolean => isActiveUser(req.user)

export const canManageUsers = (user: unknown): boolean => isActiveSuperadmin(user)

export const superadminOnly: Access = ({ req }) => canManageUsers(req.user)
