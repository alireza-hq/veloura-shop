import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  LucideProps,
  Package,
  ShoppingBag,
  Tags,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

type Link = {
  label: string
  href: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

const links: Link[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    label: 'Categories',
    href: '/admin/categories',
    icon: Tags,
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: ShoppingBag,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
]

export const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='mx-3 rounded-3xl border border-black/8 bg-white/75 p-3 shadow-sm backdrop-blur-xl lg:sticky lg:top-24 lg:mx-0 lg:ml-3 lg:h-[calc(100vh-7rem)] lg:self-start lg:rounded-[2rem] lg:p-5 dark:border-white/8 dark:bg-white/4'>
      <h2 className='mb-3 px-2 text-lg font-bold text-black lg:mb-8 lg:px-0 lg:text-xl dark:text-white'>
        Admin
      </h2>

      <nav className='flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0'>
        {links.map((link) => {
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium text-black/60 transition hover:bg-black/5 hover:text-black lg:gap-3 dark:text-white/60 dark:hover:bg-white/8 dark:hover:text-white',
                pathname === link.href &&
                  'bg-[#2a1c23] text-white shadow-sm dark:bg-white dark:text-[#2a1c23]',
              )}
            >
              <Icon className='h-4 w-4' />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
