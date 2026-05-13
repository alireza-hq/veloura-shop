export type AdminUserRole = 'user' | 'admin'

export type AdminUser = {
  id: number
  username: string
  email: string
  role: AdminUserRole
  createdAt: string
}
