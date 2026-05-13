'use client'

import { Crown, Loader2, LogOut, Mail, ShieldCheck, User } from 'lucide-react'

import { useLogout } from '../hooks/useLogout'
import { useAuthStore } from '../store/useAuthStore'

export const UserProfile = () => {
  const { user, isLoading, isAuthenticated } = useAuthStore()
  const { logout, isPending } = useLogout()

  if (isLoading) {
    return (
      <div className='flex min-h-75 items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-zinc-400' />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className='rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
        <h2 className='text-lg font-semibold text-zinc-900 dark:text-white'>
          Not logged in
        </h2>
        <p className='mt-2 text-sm text-zinc-500 dark:text-zinc-400'>
          Please log in to view your account.
        </p>
      </div>
    )
  }

  const initials = user.username.slice(0, 2).toUpperCase()
  const isAdmin = user.role === 'admin'

  return (
    <section className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
      <div>
        <p className='text-sm font-medium text-zinc-500 dark:text-zinc-400'>
          Profile
        </p>
        <h1 className='mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white'>
          Account settings
        </h1>
        <p className='mt-2 text-sm text-zinc-500 dark:text-zinc-400'>
          View your account details and manage your current session.
        </p>
      </div>

      <div className='overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
        <div className='bg-linear-to-r from-zinc-100 to-white p-6 sm:p-8 dark:from-zinc-900 dark:to-zinc-950'>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-center'>
            <div className='flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-zinc-950 text-2xl font-bold text-white shadow-sm dark:bg-white dark:text-zinc-950'>
              {initials}
            </div>

            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-center gap-3'>
                <h2 className='truncate text-2xl font-semibold text-zinc-950 dark:text-white'>
                  {user.username}
                </h2>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                    isAdmin
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {isAdmin ? (
                    <Crown className='h-3.5 w-3.5' />
                  ) : (
                    <ShieldCheck className='h-3.5 w-3.5' />
                  )}
                  {user.role}
                </span>
              </div>

              <p className='mt-2 text-sm text-zinc-500 dark:text-zinc-400'>
                Signed in and connected securely.
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-4 p-6 sm:grid-cols-2 sm:p-8'>
          <div className='rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900'>
                <User className='h-4 w-4 text-zinc-500' />
              </div>
              <div className='min-w-0'>
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                  Username
                </p>
                <p className='truncate text-sm font-medium text-zinc-950 dark:text-white'>
                  {user.username}
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900'>
                <Mail className='h-4 w-4 text-zinc-500' />
              </div>
              <div className='min-w-0'>
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                  Email
                </p>
                <p className='truncate text-sm font-medium text-zinc-950 dark:text-white'>
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 border-t border-zinc-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-zinc-800'>
          <div>
            <h3 className='text-sm font-semibold text-zinc-950 dark:text-white'>
              Current session
            </h3>
            <p className='mt-1 text-xs text-zinc-500 dark:text-zinc-400'>
              Logging out will clear your active session on this device.
            </p>
          </div>

          <button
            type='button'
            onClick={() => logout()}
            disabled={isPending}
            className='inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/15'
          >
            {isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <LogOut className='h-4 w-4' />
            )}
            {isPending ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </div>
    </section>
  )
}
