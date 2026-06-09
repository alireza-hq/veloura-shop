'use client'

import {
  Heart,
  LogIn,
  LogOut,
  ShieldCheck,
  ShoppingBag,
  User,
  UserIcon,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

import { useActive } from '@/components/layout/navbar/useActive'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'
import { Menu, Transition } from '@headlessui/react'
import { useLogout } from '@/features/auth/hooks/useLogout'

export const UserDropdown = () => {
  const { isAuthenticated, user } = useAuthStore()
  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }

  return (
    <div className='relative inline-block text-left opacity-99'>
      <Menu as='div' className='relative inline-block text-left'>
        {/* Trigger Button */}
        <Menu.Button
          aria-label='Open account menu'
          className='h-5 fill-transparent transition duration-100 hover:opacity-70'
        >
          <UserIcon
            className={cn(
              'h-5 fill-transparent transition duration-100 hover:fill-current',
              useActive([...Object.values(routes.auth), routes.orders]) &&
                'fill-current',
            )}
          />
        </Menu.Button>

        {/* Dropdown Panel */}
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-zinc-50/95 px-1 py-2 text-black shadow-lg ring-1 ring-black/5 backdrop-blur-xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/95 dark:text-white dark:ring-white/10'>
            {/* Header: User Info or Auth Options */}
            {!isAuthenticated ? (
              <div className='mb-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800'>
                <p className='text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400'>
                  Account
                </p>
              </div>
            ) : (
              <div className='mb-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800'>
                <p className='text-sm font-medium text-zinc-900 dark:text-white'>
                  {user?.username}
                </p>
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                  {user?.email}
                </p>
              </div>
            )}

            {/* Menu Items */}
            {!isAuthenticated ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={routes.auth.login}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                        active
                          ? 'bg-zinc-50/75 text-zinc-900 dark:bg-zinc-800/75 dark:text-white'
                          : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800',
                      )}
                    >
                      <LogIn className='h-4 w-4' />
                      Login
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={routes.auth.signup}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                        active
                          ? 'bg-zinc-50/75 text-zinc-900 dark:bg-zinc-800/75 dark:text-white'
                          : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800',
                      )}
                    >
                      <UserPlus className='h-4 w-4' />
                      Sign Up
                    </Link>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                {user?.role === 'admin' && isAuthenticated && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={routes.admin.root}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                          active
                            ? 'bg-zinc-50/75 text-zinc-900 dark:bg-zinc-800/75 dark:text-white'
                            : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800',
                        )}
                      >
                        <ShieldCheck className='h-4 w-4' />
                        Admin Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={routes.auth.me}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                        active
                          ? 'bg-zinc-50/75 text-zinc-900 dark:bg-zinc-800/75 dark:text-white'
                          : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800',
                      )}
                    >
                      <User className='h-4 w-4' />
                      My Account
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={routes.orders}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                        active
                          ? 'bg-zinc-50/75 text-zinc-900 dark:bg-zinc-800/75 dark:text-white'
                          : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800',
                      )}
                    >
                      <ShoppingBag className='h-4 w-4' />
                      Orders
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={routes.wishlist}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                        active
                          ? 'bg-zinc-50/75 text-zinc-900 dark:bg-zinc-800/75 dark:text-white'
                          : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800',
                      )}
                    >
                      <Heart className='h-4 w-4' />
                      Wishlist
                    </Link>
                  )}
                </Menu.Item>

                {/* Divider */}
                <div className='my-2 h-px bg-zinc-100 dark:bg-zinc-800' />

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20',
                        active && 'bg-red-200/30 dark:bg-red-900/20',
                      )}
                    >
                      <LogOut className='h-4 w-4' />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
