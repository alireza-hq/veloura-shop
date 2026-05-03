'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Mail, User } from 'lucide-react'

import { useAuthStore } from '../store/useAuthStore'
import { routes } from '@/lib/routes'

export const Me = () => {
  const { user, logout } = useAuthStore()

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push(routes.auth.login)
  }

  return (
    <div className='flex flex-col gap-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-zinc-900 dark:text-white'>
          Account
        </h1>
        <p className='mt-2 text-sm text-zinc-500 dark:text-zinc-400'>
          Manage your profile and session
        </p>
      </div>

      {/* Profile Card */}
      <div className='rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8'>
          {/* Avatar Placeholder */}
          <div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-2xl font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>

          {/* User Info */}
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <User className='h-4 w-4 text-zinc-400' />
              <span className='text-lg font-semibold text-zinc-900 dark:text-white'>
                {user?.name}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Mail className='h-4 w-4 text-zinc-400' />
              <span className='text-sm text-zinc-600 dark:text-zinc-400'>
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='my-6 h-px w-full bg-zinc-200 dark:bg-zinc-800' />

        {/* Actions */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h3 className='text-sm font-medium text-zinc-900 dark:text-white'>
              Session Status
            </h3>
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
              You are currently logged in.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className='flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40'
          >
            <LogOut className='h-4 w-4' />
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
