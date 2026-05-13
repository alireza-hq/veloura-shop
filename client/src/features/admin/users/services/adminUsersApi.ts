import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

import { AdminUser, AdminUserRole } from '../types'

export const getAdminUsersService = async () => {
  const { data } = await api.get<AdminUser[]>(endpoints.admin.users.root)

  return data
}

export const updateUserRoleService = async ({
  id,
  role,
}: {
  id: number
  role: AdminUserRole
}) => {
  const { data } = await api.patch<AdminUser>(
    endpoints.admin.users.updateRole(id),
    { role },
  )

  return data
}
