'use client'

import { format } from 'date-fns'
import { CheckCircle, Clock, PackageCheck, ShoppingBag, Truck, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

import { Order } from '../types'

type Props = Order

export const OrderItem = ({ id, status, total, items, createdAt }: Props) => {
  const progressSteps = ['pending', 'paid', 'processing', 'shipped', 'delivered']
  const currentStep = progressSteps.indexOf(status)
  const getStatusIcon = () => {
    switch (status) {
      case 'paid':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'processing':
        return <PackageCheck className='h-4 w-4 text-orange-500' />
      case 'shipped':
        return <Truck className='h-4 w-4 text-blue-500' />
      case 'delivered':
        return <CheckCircle className='h-4 w-4 text-purple-500' />
      case 'cancelled':
        return <XCircle className='h-4 w-4 text-red-500' />
      case 'pending':
      default:
        return <Clock className='h-4 w-4 text-blue-500' />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'processing':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
      case 'shipped':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
      case 'delivered':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
      case 'cancelled':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      case 'pending':
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
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      {status !== 'cancelled' && (
        <div className='mb-5 grid grid-cols-5 gap-1 border-t border-black/5 pt-4 dark:border-white/5'>
          {progressSteps.map((step, index) => (
            <div key={step}>
              <div
                className={cn(
                  'h-1 rounded-full',
                  index <= currentStep
                    ? 'bg-rose-700 dark:bg-rose-300'
                    : 'bg-black/8 dark:bg-white/10',
                )}
              />
              <p
                className={cn(
                  'mt-2 hidden text-[10px] capitalize sm:block',
                  index <= currentStep
                    ? 'text-black/65 dark:text-white/65'
                    : 'text-black/25 dark:text-white/25',
                )}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Items Summary */}
      <div className='mb-4 border-t border-black/5 pt-4 dark:border-white/5'>
        <div className='flex flex-wrap gap-2'>
          {items?.map((item) => (
            <div
              key={item.product?.id ?? item.product.name}
              className='flex items-center gap-2 rounded-lg bg-black/5 px-2 py-1 text-xs text-black/70 dark:bg-white/5 dark:text-white/70'
            >
              <ShoppingBag className='h-3 w-3 text-black/40 dark:text-white/40' />
              <span className='max-w-37.5 truncate'>
                {item.product?.name || 'Product'}
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
