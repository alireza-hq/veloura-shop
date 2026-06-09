'use client'

import {
  HeartIcon,
  Menu,
  ShoppingCartIcon,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { ThemeButton } from '@/features/theme/components/ThemeButton'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

import { NavbarSearch } from './NavbarSearch'
import { UserDropdown } from './UserDropdown'

const navigation = [
  { label: 'Products', href: routes.products.root },
  { label: 'Collections', href: routes.collections.root },
  { label: 'About', href: routes.about },
  { label: 'Contact', href: routes.contact },
]

export const Navbar = () => {
  const items = useCartStore((state) => state.items)
  const pathname = usePathname()
  const isHome = pathname === routes.home
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const solid = scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const controlClass = cn(
    'rounded-full transition-[color,background-color,box-shadow,opacity] duration-300 ease-out',
    solid
      ? 'bg-white/6 text-white'
      : isHome
        ? 'text-white'
        : 'text-[#2a1c23] dark:text-white',
  )
  const brandClass = solid || isHome ? 'text-white' : 'text-[#2a1c23] dark:text-white'

  return (
    <header className='pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4'>
      <nav
        className={cn(
          'pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl px-2 py-2 transition-[background-color,box-shadow,transform] duration-500 ease-out sm:px-3',
          solid &&
            'bg-[#2a1c23]/72 shadow-xl shadow-[#1a1015]/20 backdrop-blur-2xl',
        )}
      >
        <div className='flex min-w-0 items-center gap-4 md:gap-6'>
          <Link
            href={routes.home}
            aria-label='Veloura home'
            className={cn(
              'flex shrink-0 items-center gap-2 px-2 py-2 transition-opacity duration-150 hover:opacity-70',
              brandClass,
            )}
          >
            <Image
              src='/logo/logo.png'
              alt=''
              width={24}
              height={26}
              priority
              className='h-6 w-auto'
            />
            <span className='hidden text-lg font-semibold sm:block'>
              Veloura
            </span>
          </Link>

          <div
            className={cn(
              controlClass,
              'hidden items-center gap-5 px-5 py-2 text-sm md:flex lg:gap-7 lg:px-7',
            )}
          >
            {navigation.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'transition hover:opacity-70',
                  pathname === href && 'font-semibold',
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className='flex min-w-0 items-center justify-end gap-2 sm:gap-3'>
          <NavbarSearch light={isHome || solid} />

          <div
            className={cn(
              controlClass,
              'flex items-center gap-3 px-3 py-2.5 sm:gap-4',
            )}
          >
            <Link
              href={routes.wishlist}
              aria-label='Wishlist'
              className='relative flex items-center'
            >
              <HeartIcon
                className={cn(
                  'h-5 w-5 transition duration-150 hover:fill-current',
                  pathname === routes.wishlist && 'fill-current',
                )}
              />
            </Link>
            <Link
              href={routes.cart}
              aria-label='Shopping cart'
              className='relative flex items-center'
            >
              <ShoppingCartIcon
                className={cn(
                  'h-5 w-5 transition duration-150 hover:fill-current',
                  pathname === routes.cart && 'fill-current',
                )}
              />
              {items.length > 0 && (
                <span className='absolute -top-2.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-black'>
                  {items.length}
                </span>
              )}
            </Link>
            <UserDropdown />
          </div>

          <div className={cn(controlClass, 'hidden p-2.5 sm:flex')}>
            <ThemeButton />
          </div>

          <button
            type='button'
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMobileOpen((current) => !current)}
            className={cn(
              controlClass,
              'flex items-center justify-center p-2.5 md:hidden',
            )}
          >
            {mobileOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className='pointer-events-auto mx-auto mt-2 w-full max-w-7xl rounded-3xl bg-[#2a1c23]/88 p-2 text-white shadow-xl backdrop-blur-2xl md:hidden'>
          {navigation.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className='block rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10'
            >
              {label}
            </Link>
          ))}
          <div className='mt-1 flex items-center gap-3 border-t border-white/10 px-4 py-3 sm:hidden'>
            <ThemeButton />
            <span className='text-sm text-white/60'>Change appearance</span>
          </div>
        </div>
      )}
    </header>
  )
}
