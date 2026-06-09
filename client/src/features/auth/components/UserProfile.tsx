'use client'

import {
  ArrowUpRight,
  Crown,
  Heart,
  Loader2,
  LogOut,
  Mail,
  Package,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  User,
} from 'lucide-react'
import Link from 'next/link'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { useOrders } from '@/features/orders/hooks/useOrders'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

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
  const quickLinks = [
    {
      label: 'Orders',
      detail: `${orders.length} total`,
      icon: Package,
      href: routes.orders,
    },
    {
      label: 'Wishlist',
      detail: `${wishlist.length} saved`,
      icon: Heart,
      href: routes.wishlist,
    },
    {
      label: 'Beauty bag',
      detail: `${cartItems.reduce((sum, item) => sum + item.quantity, 0)} items`,
      icon: ShoppingBag,
      href: routes.cart,
    },
  ]

  return (
    <section className='mx-auto w-full max-w-6xl py-4 sm:py-8'>
      <header className='flex flex-col gap-8 border-b border-black/8 pb-10 sm:flex-row sm:items-end sm:justify-between dark:border-white/10'>
        <div className='flex items-center gap-5'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-rose-200 text-xl font-semibold text-rose-950 dark:bg-rose-900/45 dark:text-rose-50'>
            {initials}
          </div>
          <div>
            <p className='text-xs font-semibold tracking-[0.2em] text-rose-900/48 uppercase dark:text-rose-100/48'>
              Your account
            </p>
            <h1 className='mt-2 text-3xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white'>
              {user.username}
            </h1>
            <p className='mt-2 flex items-center gap-1.5 text-sm capitalize text-black/42 dark:text-white/42'>
              {isAdmin ? <Crown className='h-3.5 w-3.5' /> : <ShieldCheck className='h-3.5 w-3.5' />}
              {user.role} account
            </p>
          </div>
        </div>

        <button
          type='button'
          onClick={() => logout()}
          disabled={isPending}
          className='inline-flex items-center justify-center gap-2 self-start rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-black/55 transition hover:border-red-200 hover:text-red-600 disabled:opacity-50 sm:self-auto dark:border-white/12 dark:text-white/55 dark:hover:border-red-500/30 dark:hover:text-red-400'
        >
          {isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : <LogOut className='h-4 w-4' />}
          {isPending ? 'Signing out...' : 'Sign out'}
        </button>
      </header>

      <div className='grid gap-px overflow-hidden rounded-3xl bg-black/8 mt-10 sm:grid-cols-3 dark:bg-white/10'>
        {quickLinks.map(({ label, detail, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className='group flex items-center gap-4 bg-white/55 p-5 backdrop-blur-sm transition hover:bg-white sm:p-6 dark:bg-white/4 dark:hover:bg-white/7'
          >
            <span className='flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-900 dark:bg-rose-950/35 dark:text-rose-100'>
              <Icon className='h-4 w-4' />
            </span>
            <span className='min-w-0 flex-1'>
              <span className='block text-sm font-semibold text-black dark:text-white'>{label}</span>
              <span className='mt-1 block text-xs text-black/38 dark:text-white/38'>{detail}</span>
            </span>
            <ArrowUpRight className='h-4 w-4 text-black/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black dark:text-white/20 dark:group-hover:text-white' />
          </Link>
        ))}
      </div>

      <div className='mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]'>
        <section>
          <p className='text-xs font-semibold tracking-[0.2em] text-black/35 uppercase dark:text-white/35'>
            Account details
          </p>
          <div className='mt-5 divide-y divide-black/8 border-y border-black/8 dark:divide-white/10 dark:border-white/10'>
            <Detail icon={User} label='Username' value={user.username} />
            <Detail icon={Mail} label='Email' value={user.email} />
            <Detail icon={isAdmin ? Crown : ShieldCheck} label='Access' value={isAdmin ? 'Administrator' : 'Customer'} />
          </div>
        </section>

        <section>
          <div className='flex items-end justify-between gap-4'>
            <div>
              <p className='text-xs font-semibold tracking-[0.2em] text-black/35 uppercase dark:text-white/35'>
                Recent activity
              </p>
              <h2 className='mt-3 text-2xl font-semibold tracking-tight text-black dark:text-white'>
                Latest orders
              </h2>
            </div>
            <Link href={routes.orders} className='text-xs font-semibold text-black/45 hover:text-black dark:text-white/45 dark:hover:text-white'>
              View all
            </Link>
          </div>

          <div className='mt-5 divide-y divide-black/8 border-y border-black/8 dark:divide-white/10 dark:border-white/10'>
            {orders.length ? (
              orders.slice(0, 4).map((order) => (
                <Link key={order.id} href={routes.orders} className='group flex items-center gap-4 py-5'>
                  <span className='flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/7'>
                    <ReceiptText className='h-4 w-4 text-black/45 dark:text-white/45' />
                  </span>
                  <span className='min-w-0 flex-1'>
                    <span className='block text-sm font-semibold text-black dark:text-white'>Order #{order.id}</span>
                    <span className='mt-1 block text-xs text-black/35 dark:text-white/35'>
                      {new Date(order.createdAt).toLocaleDateString()} · ${Number(order.total).toFixed(2)}
                    </span>
                  </span>
                  <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize', statusClass[order.status])}>
                    {order.status}
                  </span>
                </Link>
              ))
            ) : (
              <div className='py-10'>
                <p className='text-sm text-black/42 dark:text-white/42'>No orders yet.</p>
                <Link href={routes.products.root} className='mt-3 inline-flex text-sm font-semibold text-black dark:text-white'>
                  Explore products
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}

const statusClass = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/25 dark:text-amber-300',
  paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-300',
  processing: 'bg-orange-100 text-orange-800 dark:bg-orange-900/25 dark:text-orange-300',
  shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/25 dark:text-blue-300',
  delivered: 'bg-purple-100 text-purple-800 dark:bg-purple-900/25 dark:text-purple-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/25 dark:text-red-300',
}

const Detail = ({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) => (
  <div className='flex items-center gap-4 py-5'>
    <Icon className='h-4 w-4 text-rose-900/45 dark:text-rose-100/45' />
    <div className='min-w-0 flex-1'>
      <p className='text-xs text-black/35 dark:text-white/35'>{label}</p>
      <p className='mt-1 truncate text-sm font-medium text-black dark:text-white'>{value}</p>
    </div>
  </div>
)
