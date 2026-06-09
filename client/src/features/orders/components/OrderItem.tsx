'use client'

import { format } from 'date-fns'
import {
  CheckCircle,
  Clock,
  CreditCard,
  Loader2,
  PackageCheck,
  ShoppingBag,
  Truck,
  XCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils/cn'

import { usePayOrder } from '../hooks/usePayOrder'
import { Order, OrderStatus } from '../types'

type Props = Order

const progressSteps: OrderStatus[] = [
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
]

const statusDetails: Record<
  OrderStatus,
  { label: string; description: string; className: string }
> = {
  pending: {
    label: 'Awaiting payment',
    description: 'Reserved for one hour',
    className: 'bg-amber-50 text-amber-800 dark:bg-amber-300/10 dark:text-amber-200',
  },
  paid: {
    label: 'Paid',
    description: 'Waiting for processing',
    className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-300',
  },
  processing: {
    label: 'Processing',
    description: 'Your order is being prepared',
    className: 'bg-orange-50 text-orange-700 dark:bg-orange-300/10 dark:text-orange-300',
  },
  shipped: {
    label: 'Shipped',
    description: 'Your order is on its way',
    className: 'bg-blue-50 text-blue-700 dark:bg-blue-300/10 dark:text-blue-300',
  },
  delivered: {
    label: 'Delivered',
    description: 'Order delivered',
    className: 'bg-purple-50 text-purple-700 dark:bg-purple-300/10 dark:text-purple-300',
  },
  cancelled: {
    label: 'Cancelled',
    description: 'Reservation released',
    className: 'bg-red-50 text-red-700 dark:bg-red-300/10 dark:text-red-300',
  },
}

const StatusIcon = ({ status }: { status: OrderStatus }) => {
  const className = 'h-4 w-4'

  switch (status) {
    case 'paid':
    case 'delivered':
      return <CheckCircle className={className} />
    case 'processing':
      return <PackageCheck className={className} />
    case 'shipped':
      return <Truck className={className} />
    case 'cancelled':
      return <XCircle className={className} />
    default:
      return <Clock className={className} />
  }
}

export const OrderItem = ({
  id,
  status,
  total,
  items,
  createdAt,
  paymentExpiresAt,
}: Props) => {
  const payOrder = usePayOrder()
  const currentStep = progressSteps.indexOf(status)
  const details = statusDetails[status]

  return (
    <article className='rounded-3xl border border-black/6 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 dark:border-white/8 dark:bg-white/4'>
      <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
        <div>
          <p className='text-xs font-semibold tracking-[0.16em] text-black/35 uppercase dark:text-white/35'>
            Order #{id.toString().slice(-6).toUpperCase()}
          </p>
          <p className='mt-1 text-sm text-black/55 dark:text-white/55'>
            {format(new Date(createdAt), 'MMM d, yyyy')}
          </p>
        </div>
        <div className={cn('flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-semibold', details.className)}>
          <StatusIcon status={status} />
          {details.label}
        </div>
      </div>

      {status !== 'cancelled' && (
        <div className='my-5 grid grid-cols-5 gap-1 border-y border-black/5 py-4 dark:border-white/6'>
          {progressSteps.map((step, index) => (
            <div key={step}>
              <div
                className={cn(
                  'h-1 rounded-full transition-colors',
                  index <= currentStep
                    ? 'bg-rose-700 dark:bg-rose-300'
                    : 'bg-black/8 dark:bg-white/10',
                )}
              />
              <p className={cn('mt-2 hidden text-[10px] capitalize sm:block', index <= currentStep ? 'text-black/65 dark:text-white/65' : 'text-black/25 dark:text-white/25')}>
                {step}
              </p>
            </div>
          ))}
        </div>
      )}

      {status === 'pending' && (
        <div className='my-5 flex flex-col gap-4 rounded-2xl bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-amber-300/8'>
          <div>
            <p className='text-sm font-semibold text-amber-950 dark:text-amber-100'>
              Payment is required to confirm this order
            </p>
            <p className='mt-1 text-xs text-amber-900/60 dark:text-amber-100/55'>
              Reserved until{' '}
              {paymentExpiresAt
                ? format(new Date(paymentExpiresAt), 'MMM d, h:mm a')
                : 'one hour after checkout'}
              . Unpaid orders cancel automatically.
            </p>
          </div>
          <button
            type='button'
            disabled={payOrder.isPending}
            onClick={() => payOrder.mutate(id)}
            className='flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-50 dark:bg-amber-100 dark:text-amber-950 dark:hover:bg-amber-50'
          >
            {payOrder.isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : <CreditCard className='h-4 w-4' />}
            {payOrder.isPending ? 'Processing...' : 'Pay now'}
          </button>
        </div>
      )}

      {status !== 'pending' && (
        <p className='my-5 text-sm text-black/50 dark:text-white/50'>
          {details.description}
        </p>
      )}

      <div className='flex flex-wrap gap-2'>
        {items?.map((item) => (
          <div
            key={item.product?.id ?? item.product.name}
            className='flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-xs text-black/65 dark:bg-white/6 dark:text-white/65'
          >
            <ShoppingBag className='h-3 w-3 opacity-50' />
            <span className='max-w-40 truncate'>{item.product?.name || 'Product'}</span>
            <span className='opacity-50'>x{item.quantity}</span>
          </div>
        ))}
      </div>

      <div className='mt-5 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/6'>
        <span className='text-sm text-black/50 dark:text-white/50'>Total</span>
        <span className='text-lg font-semibold text-black dark:text-white'>
          ${Number(total).toFixed(2)}
        </span>
      </div>
    </article>
  )
}
