'use client'

import { DollarSign, Package, ShoppingBag, Tags, Users } from 'lucide-react'

import { LoadingState } from '@/components/ui/LoadingState'

import { useAdminStats } from '@/features/admin/hooks/useAdminStats'
import { cn } from '@/lib/utils/cn'

export default function AdminPage() {
  const { data, isLoading } = useAdminStats()

  if (isLoading || !data) return <LoadingState />

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>
          Dashboard
        </h1>

        <p className='mt-2 text-sm text-black/50 dark:text-white/50'>
          Manage your store, products, orders, and users.
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
        <StatCard title='Products' value={data.totalProducts} icon={Package} />

        <StatCard title='Categories' value={data.totalCategories} icon={Tags} />

        <StatCard title='Orders' value={data.totalOrders} icon={ShoppingBag} />

        <StatCard title='Users' value={data.totalUsers} icon={Users} />

        <StatCard
          title='Revenue'
          value={`$${Number(data.totalRevenue).toFixed(2)}`}
          icon={DollarSign}
        />
      </div>

      <div className='mt-8 rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950'>
        <div className='border-b border-black/10 p-6 dark:border-white/10'>
          <h2 className='text-lg font-semibold text-black dark:text-white'>
            Recent Orders
          </h2>
        </div>

        <div className='divide-y divide-black/5 dark:divide-white/5'>
          {data.recentOrders.map((order) => (
            <div
              key={order.id}
              className='flex items-center justify-between p-6'
            >
              <div>
                <p className='font-medium text-black dark:text-white'>
                  #{order.id}
                </p>

                <p className='text-sm text-black/50 dark:text-white/50'>
                  {order.user.username}
                </p>
              </div>

              <div className='flex flex-col items-end gap-2 text-right'>
                <p className='font-semibold text-black dark:text-white'>
                  ${Number(order.total).toFixed(2)}
                </p>

                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
                    getStatusClass(order.status),
                  )}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-300'
    case 'processing':
      return 'bg-orange-50 text-orange-700 dark:bg-orange-300/10 dark:text-orange-300'
    case 'shipped':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-300/10 dark:text-blue-300'
    case 'delivered':
      return 'bg-purple-50 text-purple-700 dark:bg-purple-300/10 dark:text-purple-300'
    case 'cancelled':
      return 'bg-red-50 text-red-700 dark:bg-red-300/10 dark:text-red-300'
    default:
      return 'bg-amber-50 text-amber-800 dark:bg-amber-300/10 dark:text-amber-200'
  }
}

type StatCardProps = {
  title: string
  value: string | number
  icon: React.ElementType
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  return (
    <div className='rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-black/50 dark:text-white/50'>{title}</p>

          <p className='mt-2 text-3xl font-bold text-black dark:text-white'>
            {value}
          </p>
        </div>

        <div className='rounded-xl bg-black/5 p-3 dark:bg-white/5'>
          <Icon className='h-5 w-5 text-black/70 dark:text-white/70' />
        </div>
      </div>
    </div>
  )
}
