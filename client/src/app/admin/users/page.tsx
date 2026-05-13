'use client'

import { LoadingState } from '@/components/ui/LoadingState'

import { AdminUsersHeader } from '@/features/admin/users/components/AdminUsersHeader'
import { AdminUsersTable } from '@/features/admin/users/components/AdminUsersTable'
import { useAdminUsers } from '@/features/admin/users/hooks/useAdminUsers'

export default function AdminUsersPage() {
  const { data: users = [], isLoading } = useAdminUsers()

  if (isLoading) return <LoadingState />

  return (
    <div>
      <AdminUsersHeader />

      <AdminUsersTable users={users} />
    </div>
  )
}
