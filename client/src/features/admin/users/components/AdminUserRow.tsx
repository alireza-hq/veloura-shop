'use client'

import { format } from 'date-fns'
import { Crown, Loader2, ShieldCheck, UserIcon } from 'lucide-react'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { cn } from '@/lib/utils/cn'

import { useUpdateUserRole } from '../hooks/useUpdateUserRole'
import { AdminUser, AdminUserRole } from '../types'

type Props = {
  user: AdminUser
}

export const AdminUserRow = ({ user }: Props) => {
  const currentUser = useAuthStore((state) => state.user)

  const updateRole = useUpdateUserRole()

  const isSelf = currentUser?.id === user.id

  const handleRoleChange = (role: AdminUserRole) => {
    if (isSelf) {
      alert("You can't change your own role from here.")
      return
    }

    updateRole.mutate({
      id: user.id,
      role,
    })
  }

  return (
    <tr className='border-b border-black/5 last:border-0 dark:border-white/5'>
      <td className='p-4'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-sm font-semibold text-black dark:bg-white/10 dark:text-white'>
            {user.username.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <p className='font-medium text-black dark:text-white'>
              {user.username}
            </p>

            {isSelf && (
              <p className='text-xs text-black/40 dark:text-white/40'>You</p>
            )}
          </div>
        </div>
      </td>

      <td className='p-4 text-black/60 dark:text-white/60'>{user.email}</td>

      <td className='p-4'>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize',
            user.role === 'admin'
              ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
              : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
          )}
        >
          {user.role === 'admin' ? (
            <Crown className='h-3.5 w-3.5' />
          ) : (
            <ShieldCheck className='h-3.5 w-3.5' />
          )}
          {user.role}
        </span>
      </td>

      <td className='p-4 text-black/60 dark:text-white/60'>
        {format(new Date(user.createdAt), 'MMM d, yyyy')}
      </td>

      <td className='p-4'>
        <div className='flex items-center justify-end gap-2'>
          <select
            value={user.role}
            disabled={updateRole.isPending || isSelf}
            onChange={(e) => handleRoleChange(e.target.value as AdminUserRole)}
            className='rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-black dark:text-white'
          >
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>

          {updateRole.isPending ? (
            <Loader2 className='h-4 w-4 animate-spin text-black/40 dark:text-white/40' />
          ) : (
            <UserIcon className='h-4 w-4 text-black/20 dark:text-white/20' />
          )}
        </div>
      </td>
    </tr>
  )
}
