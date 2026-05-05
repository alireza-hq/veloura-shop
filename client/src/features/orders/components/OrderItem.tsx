'use client'

import { format } from 'date-fns'
import { CheckCircle, Clock, ShoppingBag, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

import { Order } from '../types'

type Props = Order

export const OrderItem = ({ id, status, total, items, createdAt }: Props) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'CANCELLED':
        return <XCircle className='h-4 w-4 text-red-500' />
      case 'PENDING':
      default:
        return <Clock className='h-4 w-4 text-blue-500' />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'PAID':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      case 'PENDING':
      default:
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
    }
  }

  return (
    <div className='mb-4 rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-colors hover:border-black/10 sm:p-6 dark:border-white/5 dark:bg-zinc-900 dark:hover:border-white/10'>
      {/* Header */}
      <div className='mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
        <div>
          <p className='text-xs font-medium text-black/40 dark:text-white/40'>
            Order #{id?.toString().slice(-6).toUpperCase() || '---'}
          </p>
          <p className='text-sm text-black/60 dark:text-white/60'>
            {createdAt ? format(new Date(createdAt), 'MMM d, yyyy') : 'No date'}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
              getStatusColor(),
            )}
          >
            {getStatusIcon()}
            {status}
          </span>
        </div>
      </div>

      {/* Items Summary */}
      <div className='mb-4 border-t border-black/5 pt-4 dark:border-white/5'>
        <div className='flex flex-wrap gap-2'>
          {items?.map((item) => (
            <div
              key={item.id || item.productId}
              className='flex items-center gap-2 rounded-lg bg-black/5 px-2 py-1 text-xs text-black/70 dark:bg-white/5 dark:text-white/70'
            >
              <ShoppingBag className='h-3 w-3 text-black/40 dark:text-white/40' />
              <span className='max-w-37.5 truncate'>
                {item.titleSnapshot || 'Product'}
              </span>
              <span className='text-black/40 dark:text-white/40'>
                ×{item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/5'>
        <div className='text-sm text-black/60 dark:text-white/60'>Total</div>
        <div className='text-lg font-bold text-black dark:text-white'>
          ${total.toFixed(2)}
        </div>
      </div>
    </div>
  )
}
