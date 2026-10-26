export type UserRole =
  | 'superadmin'
  | 'site-manager'
  | 'department-manager'
  | 'placement-manager'
  | 'society-manager'
  | 'contributor'

export const userRoleOptions: { label: string; value: UserRole }[] = [
  { label: 'Superadmin', value: 'superadmin' },
  { label: 'Site manager', value: 'site-manager' },
  { label: 'Department manager', value: 'department-manager' },
  { label: 'Placement manager', value: 'placement-manager' },
  { label: 'Society manager', value: 'society-manager' },
  { label: 'Contributor', value: 'contributor' },
]

export const readUserRole = (user: unknown): UserRole | null => {
  if (!user || typeof user !== 'object' || !('role' in user)) {
    return null
  }

  switch (user.role) {
    case 'superadmin':
    case 'site-manager':
    case 'department-manager':
    case 'placement-manager':
    case 'society-manager':
    case 'contributor':
      return user.role
    default:
      return null
  }
}

export const isActiveUser = (user: unknown): boolean =>
  Boolean(
    user &&
    typeof user === 'object' &&
    'active' in user &&
    user.active === true &&
    readUserRole(user),
  )

export const isActiveSuperadmin = (user: unknown): boolean =>
  isActiveUser(user) && readUserRole(user) === 'superadmin'
