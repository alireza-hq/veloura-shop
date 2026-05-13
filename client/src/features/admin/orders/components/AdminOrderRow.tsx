'use client'

import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

import { useUpdateOrderStatus } from '../hooks/useUpdateOrderStatus'
import { AdminOrder, AdminOrderStatus } from '../types'

type Props = {
  order: AdminOrder
}

const statuses: AdminOrderStatus[] = [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
]

export const AdminOrderRow = ({ order }: Props) => {
  const updateStatus = useUpdateOrderStatus()

  const isUpdating = updateStatus.isPending

  const handleStatusChange = (status: AdminOrderStatus) => {
    updateStatus.mutate({
      id: order.id,
      status,
    })
  }

  return (
    <tr className='border-b border-black/5 last:border-0 dark:border-white/5'>
      <td className='p-4'>
        <p className='font-medium text-black dark:text-white'>#{order.id}</p>
      </td>

      <td className='p-4'>
        <div>
          <p className='font-medium text-black dark:text-white'>
            {order.user.username}
          </p>
          <p className='text-xs text-black/40 dark:text-white/40'>
            {order.user.email}
          </p>
        </div>
      </td>

      <td className='p-4 font-medium text-black dark:text-white'>
        ${Number(order.total).toFixed(2)}
      </td>

      <td className='p-4'>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-medium capitalize',
            getStatusClass(order.status),
          )}
        >
          {order.status}
        </span>
      </td>

      <td className='p-4 text-black/60 dark:text-white/60'>
        {format(new Date(order.createdAt), 'MMM d, yyyy')}
      </td>

      <td className='p-4'>
        <div className='flex items-center justify-end gap-2'>
          <select
            value={order.status}
            disabled={isUpdating}
            onChange={(e) =>
              handleStatusChange(e.target.value as AdminOrderStatus)
            }
            className='rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none disabled:opacity-60 dark:border-white/10 dark:bg-black dark:text-white'
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.toUpperCase()}
              </option>
            ))}
          </select>

          {isUpdating && (
            <Loader2 className='h-4 w-4 animate-spin text-black/40 dark:text-white/40' />
          )}
        </div>
      </td>
    </tr>
  )
}

const getStatusClass = (status: AdminOrderStatus) => {
  switch (status) {
    case 'paid':
      return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
    case 'shipped':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
    case 'delivered':
      return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
    case 'cancelled':
      return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
    case 'pending':
    default:
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
  }
}
