'use client'

import { HeartIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { ThemeButton } from '@/features/theme/components/ThemeButton'
import { useActive } from '@/components/layout/navbar/useActive'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

import { UserDropdown } from '../../ui/UserDropdown'
import { NavbarSearch } from './NavbarSearch'

export const Navbar = () => {
  const items = useCartStore((s) => s.items)

  // const { isAuthenticated } = useAuthStore()

  return (
    <header className='absolute z-50 w-full'>
      <nav className='my-2 flex w-full items-center justify-between gap-4 px-12 py-4 text-gray-50 md:gap-16 md:px-8 lg:px-12 dark:text-white'>
        <div className='flex w-fit min-w-0 items-center gap-4 md:gap-8'>
          <Link
            href={routes.home}
            className='flex items-center gap-1 rounded-full bg-zinc-50/15 px-8 py-2 dark:bg-zinc-800/50'
          >
            <span>
              <FaShoppingCart strokeWidth='1.5px' className='h-5 w-5 md:h-6' />
            </span>
            <span className='hidden text-xl font-bold sm:block'>Cartify</span>
          </Link>

          <div className='hidden items-center gap-4 rounded-full bg-zinc-50/15 px-4 py-2 md:flex md:gap-7 md:px-6 lg:px-10 dark:bg-zinc-800/50'>
            <Link
              className={cn(
                'text-sm hover:opacity-85 md:text-[17px]',
                useActive(routes.products.root) && 'font-semibold',
              )}
              href={routes.products.root}
            >
              Shop
            </Link>
            <Link
              className={cn(
                'text-sm hover:opacity-85 md:text-[17px]',
                useActive(routes.categories) &&
                  'font-semibold hover:opacity-100',
              )}
              href={routes.categories}
            >
              Categories
            </Link>
            <Link
              className={cn(
                'hidden text-sm hover:opacity-85 md:text-[17px] lg:block',
                useActive(routes.about) && 'font-semibold hover:opacity-100',
              )}
              href={routes.about}
            >
              About
            </Link>
            <Link
              className={cn(
                'hidden text-sm hover:opacity-85 md:text-[17px] lg:block',
                useActive(routes.contact) && 'font-semibold hover:opacity-100',
              )}
              href={routes.contact}
            >
              Contact
            </Link>
          </div>
        </div>

        <div className='flex w-auto items-center justify-end gap-3 md:w-1/3 md:gap-10'>
          <NavbarSearch />

          <div className='flex items-center gap-2 rounded-full bg-zinc-50/15 px-2 py-2.5 md:gap-4 md:px-3 md:py-3 dark:bg-zinc-800/50'>
            <Link
              href={routes.wishlist}
              className='relative flex items-center text-white/90'
            >
              <HeartIcon
                className={cn(
                  'h-5 fill-transparent duration-300 hover:fill-white hover:opacity-90',
                  useActive(routes.wishlist) && 'fill-white',
                )}
              />
            </Link>
            <Link href={routes.cart} className='relative text-white/90'>
              <ShoppingCartIcon
                className={cn(
                  'h-5 fill-transparent duration-300 hover:fill-white hover:opacity-90',
                  useActive(routes.cart) && 'fill-white',
                )}
              />
              {items.length > 0 && (
                <span className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white dark:bg-zinc-700'>
                  {items.length}
                </span>
              )}
            </Link>
            {/* <Link
              href={isAuthenticated ? routes.auth.me : routes.auth.login}
              className='h-5 fill-transparent duration-300 hover:fill-white hover:opacity-90'
            >
              <UserIcon
                className={cn(
                  'h-5 fill-transparent duration-300 hover:fill-white',
                  useActive([...Object.values(routes.auth)]) && 'fill-white',
                )}
              />
            </Link> */}
            <div className='h-5'>
              <UserDropdown />
            </div>
          </div>

          <div className='flex rounded-full bg-zinc-50/15 px-2 py-2 dark:bg-zinc-800/50'>
            <ThemeButton />
          </div>
        </div>
      </nav>
    </header>
  )
}
