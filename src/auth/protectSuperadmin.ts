import { APIError } from 'payload'
import type {
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
  CollectionBeforeLoginHook,
} from 'payload'

import { isActiveSuperadmin, isActiveUser, readUserRole } from './roles'

const LAST_SUPERADMIN_ERROR = 'The last active superadmin cannot be disabled, demoted, or deleted.'

const countOtherActiveSuperadmins = async (
  req: Parameters<CollectionBeforeDeleteHook>[0]['req'],
  id: number | string,
): Promise<number> => {
  const result = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
    req,
    where: {
      and: [
        { id: { not_equals: id } },
        { role: { equals: 'superadmin' } },
        { active: { equals: true } },
      ],
    },
  })

  return result.totalDocs
}

export const assertAnotherActiveSuperadmin = (count: number): void => {
  if (count === 0) {
    throw new APIError(LAST_SUPERADMIN_ERROR, 400, undefined, true)
  }
}

export const blocksActiveSuperadminUpdate = (
  currentUser: unknown,
  nextRole: unknown,
  nextActive: unknown,
): boolean => {
  if (!isActiveSuperadmin(currentUser)) {
    return false
  }

  const role = nextRole === undefined ? readUserRole(currentUser) : nextRole
  const active =
    nextActive === undefined &&
    currentUser &&
    typeof currentUser === 'object' &&
    'active' in currentUser
      ? currentUser.active
      : nextActive

  return role !== 'superadmin' || active !== true
}

export const protectLastSuperadminBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (
    operation !== 'update' ||
    !originalDoc ||
    !blocksActiveSuperadminUpdate(originalDoc, data.role, data.active)
  ) {
    return data
  }

  const count = await countOtherActiveSuperadmins(req, originalDoc.id)
  assertAnotherActiveSuperadmin(count)

  return data
}

export const protectLastSuperadminBeforeDelete: CollectionBeforeDeleteHook = async ({
  id,
  req,
}) => {
  const user = await req.payload.findByID({
    id,
    collection: 'users',
    overrideAccess: true,
    req,
  })

  if (!isActiveSuperadmin(user)) {
    return
  }

  const count = await countOtherActiveSuperadmins(req, id)
  assertAnotherActiveSuperadmin(count)
}

export const preventDisabledUserLogin: CollectionBeforeLoginHook = ({ user }) => {
  if (!isActiveUser(user)) {
    throw new APIError('This account is disabled.', 403, undefined, true)
  }

  return user
}
