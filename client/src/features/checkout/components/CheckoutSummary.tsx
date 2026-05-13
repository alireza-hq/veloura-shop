'use client'

import { Loader2 } from 'lucide-react'

import { useCheckoutPreview } from '../hooks/useCheckoutPreview'

export const CheckoutSummary = () => {
  const { data, isLoading } = useCheckoutPreview()

  if (isLoading) {
    return (
      <div className='lg:col-span-1'>
        <div className='sticky top-8 flex min-h-40 items-center justify-center rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-zinc-900'>
          <Loader2 className='h-5 w-5 animate-spin text-black/40 dark:text-white/40' />
        </div>
      </div>
    )
  }

  const items = data?.items ?? []
  const subtotal = Number(data?.subtotal ?? 0)
  const shipping = Number(data?.shipping ?? 0)
  const tax = Number(data?.tax ?? 0)
  const total = Number(data?.total ?? 0)

  return (
    <div className='lg:col-span-1'>
      <div className='sticky top-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-zinc-900'>
        <h3 className='mb-4 text-lg font-semibold text-black dark:text-white'>
          Order Summary
        </h3>

        <div className='space-y-3 border-b border-black/5 pb-4 dark:border-white/5'>
          {items.map((item: any) => (
            <div
              key={item.product.id}
              className='flex justify-between gap-4 text-sm'
            >
              <span className='text-black/70 dark:text-white/70'>
                {item.product.name} × {item.quantity}
              </span>
              <span className='font-medium text-black dark:text-white'>
                ${(Number(item.product.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className='mt-4 space-y-2 border-b border-black/5 pb-4 text-sm dark:border-white/5'>
          <div className='flex justify-between text-black/60 dark:text-white/60'>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className='flex justify-between text-black/60 dark:text-white/60'>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className='flex justify-between text-black/60 dark:text-white/60'>
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className='mt-4 flex items-center justify-between text-lg font-bold text-black dark:text-white'>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
