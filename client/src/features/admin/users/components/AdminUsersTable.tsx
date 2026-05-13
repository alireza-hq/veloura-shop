import { AdminUser } from '../types'
import { AdminUserRow } from './AdminUserRow'

type Props = {
  users: AdminUser[]
}

export const AdminUsersTable = ({ users }: Props) => {
  if (users.length === 0) {
    return (
      <div className='rounded-2xl border border-black/10 bg-white p-10 text-center text-sm text-black/50 dark:border-white/10 dark:bg-zinc-950 dark:text-white/50'>
        No users found.
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950'>
      <table className='w-full text-sm'>
        <thead className='border-b border-black/10 text-left text-black/50 dark:border-white/10 dark:text-white/50'>
          <tr>
            <th className='p-4'>User</th>
            <th className='p-4'>Email</th>
            <th className='p-4'>Role</th>
            <th className='p-4'>Joined</th>
            <th className='p-4 text-right'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <AdminUserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
