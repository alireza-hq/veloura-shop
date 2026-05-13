import { useActive } from '@/components/layout/navbar/useActive'
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
  return (
    <aside className='border-r border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950'>
      <h2 className='mb-8 text-xl font-bold text-black dark:text-white'>
        Admin
      </h2>

      <nav className='space-y-2'>
        {links.map((link) => {
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-black/60 transition hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white',
                useActive(link.href) &&
                  'bg-black/5 text-black dark:bg-white/10 dark:text-white',
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
