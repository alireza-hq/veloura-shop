'use client'

import {
  ArrowRight,
  Crown,
  Heart,
  Loader2,
  LogOut,
  Mail,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
} from 'lucide-react'
import Link from 'next/link'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { useOrders } from '@/features/orders/hooks/useOrders'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { routes } from '@/lib/routes'

import { useLogout } from '../hooks/useLogout'
import { useAuthStore } from '../store/useAuthStore'

export const UserProfile = () => {
  const { user, isLoading, isAuthenticated } = useAuthStore()
  const cartItems = useCartStore((state) => state.items)
  const { data: orders = [] } = useOrders(isAuthenticated)
  const { data: wishlist = [] } = useWishlist()
  const { logout, isPending } = useLogout()

  if (isLoading) {
    return (
      <div className='flex min-h-96 items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-rose-900/40 dark:text-rose-100/40' />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className='py-24 text-center'>
        <h2 className='text-2xl font-semibold text-black dark:text-white'>
          Sign in to view your profile
        </h2>
        <Link
          href={routes.auth.login}
          className='mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-[#24191e]'
        >
          Sign in
        </Link>
      </div>
    )
  }

  const initials = user.username.slice(0, 2).toUpperCase()
  const isAdmin = user.role === 'admin'
  const stats = [
    { label: 'Orders', value: orders.length, icon: Package, href: routes.orders },
    {
      label: 'Saved items',
      value: wishlist.length,
      icon: Heart,
      href: routes.wishlist,
    },
    {
      label: 'In your bag',
      value: cartItems.reduce((total, item) => total + item.quantity, 0),
      icon: ShoppingBag,
      href: routes.cart,
    },
  ]

  return (
    <section className='mx-auto w-full max-w-6xl space-y-12 py-4 sm:py-8'>
      <div className='grid items-end gap-8 lg:grid-cols-[1fr_auto]'>
        <div>
          <p className='text-xs font-semibold tracking-[0.22em] text-rose-900/55 uppercase dark:text-rose-100/50'>
            Your Veloura
          </p>
          <h1 className='mt-5 text-5xl font-semibold tracking-[-0.055em] text-black sm:text-7xl dark:text-white'>
            Welcome, {user.username}.
          </h1>
          <p className='mt-5 max-w-xl text-base leading-7 text-black/48 dark:text-white/48'>
            Keep an eye on your orders, saved beauty, and the essentials waiting
            in your bag.
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex h-18 w-18 items-center justify-center rounded-full bg-rose-200 text-lg font-semibold text-rose-950 shadow-lg shadow-rose-900/10 dark:bg-rose-900/45 dark:text-rose-50'>
            {initials}
          </div>
          <div>
            <p className='font-semibold text-black dark:text-white'>
              {user.username}
            </p>
            <span className='mt-1 inline-flex items-center gap-1 text-xs capitalize text-black/45 dark:text-white/45'>
              {isAdmin ? (
                <Crown className='h-3.5 w-3.5' />
              ) : (
                <ShieldCheck className='h-3.5 w-3.5' />
              )}
              {user.role} account
            </span>
          </div>
        </div>
      </div>

      <div className='grid gap-px overflow-hidden rounded-3xl bg-black/8 sm:grid-cols-3 dark:bg-white/10'>
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className='group bg-white/65 p-6 backdrop-blur-sm transition hover:bg-white sm:p-8 dark:bg-[#2b1e24]/82 dark:hover:bg-[#34242c]'
          >
            <div className='flex items-center justify-between'>
              <Icon className='h-5 w-5 text-rose-900/45 dark:text-rose-100/45' />
              <ArrowRight className='h-4 w-4 text-black/20 transition group-hover:translate-x-1 group-hover:text-black dark:text-white/20 dark:group-hover:text-white' />
            </div>
            <p className='mt-8 text-4xl font-semibold tracking-tight text-black dark:text-white'>
              {value}
            </p>
            <p className='mt-1 text-sm text-black/45 dark:text-white/45'>
              {label}
            </p>
          </Link>
        ))}
      </div>

      <div className='grid gap-8 lg:grid-cols-[1.15fr_0.85fr]'>
        <section className='rounded-[2rem] border border-black/8 bg-white/55 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-[#2b1e24]/72'>
          <div className='flex items-center gap-3'>
            <Sparkles className='h-5 w-5 text-rose-900/45 dark:text-rose-100/45' />
            <h2 className='text-xl font-semibold text-black dark:text-white'>
              Account details
            </h2>
          </div>

          <div className='mt-8 divide-y divide-black/8 border-y border-black/8 dark:divide-white/10 dark:border-white/10'>
            <Detail icon={User} label='Username' value={user.username} />
            <Detail icon={Mail} label='Email address' value={user.email} />
            <Detail
              icon={isAdmin ? Crown : ShieldCheck}
              label='Account access'
              value={isAdmin ? 'Administrator' : 'Customer'}
            />
          </div>
        </section>

        <aside className='flex flex-col justify-between rounded-[2rem] bg-[#2a1c23] p-7 text-white sm:p-8'>
          <div>
            <p className='text-xs font-semibold tracking-[0.2em] text-white/40 uppercase'>
              Explore next
            </p>
            <h2 className='mt-4 text-3xl font-semibold tracking-tight'>
              Find something made for your routine.
            </h2>
            <Link
              href={routes.products.root}
              className='mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white'
            >
              Browse the makeup edit
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <button
            type='button'
            onClick={() => logout()}
            disabled={isPending}
            className='mt-12 inline-flex items-center justify-center gap-2 self-start rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/16 hover:text-white disabled:cursor-wait disabled:opacity-50'
          >
            {isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <LogOut className='h-4 w-4' />
            )}
            {isPending ? 'Signing out...' : 'Sign out'}
          </button>
        </aside>
      </div>
    </section>
  )
}

const Detail = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: string
}) => (
  <div className='flex items-center gap-4 py-5'>
    <span className='flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-900 dark:bg-rose-950/35 dark:text-rose-100'>
      <Icon className='h-4 w-4' />
    </span>
    <div className='min-w-0'>
      <p className='text-xs text-black/38 dark:text-white/38'>{label}</p>
      <p className='mt-1 truncate text-sm font-medium text-black dark:text-white'>
        {value}
      </p>
    </div>
  </div>
)
