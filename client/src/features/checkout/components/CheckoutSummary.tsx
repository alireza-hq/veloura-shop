'use client'

import { Loader2, PackageCheck, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

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
    <aside>
      <div className='sticky top-28 rounded-[2rem] border border-black/7 bg-white/75 p-5 shadow-sm backdrop-blur-sm sm:p-6 dark:border-white/8 dark:bg-white/4'>
        <div className='mb-5 flex items-center justify-between'>
          <div>
            <p className='text-xs font-semibold tracking-[0.16em] text-black/35 uppercase dark:text-white/35'>
              Your bag
            </p>
            <h3 className='mt-1 text-lg font-semibold text-black dark:text-white'>
              Order summary
            </h3>
          </div>
          <span className='rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-black/45 dark:bg-white/7 dark:text-white/45'>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className='space-y-4 border-b border-black/7 pb-5 dark:border-white/7'>
          {items.map((item) => (
            <div
              key={item.product.id}
              className='flex items-center gap-3 text-sm'
            >
              <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-black/4 dark:bg-white/6'>
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes='56px'
                  className='object-cover'
                />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate font-medium text-black dark:text-white'>
                  {item.product.name}
                </p>
                <p className='mt-1 text-xs text-black/40 dark:text-white/40'>
                  Quantity {item.quantity}
                </p>
              </div>
              <span className='shrink-0 font-medium text-black dark:text-white'>
                ${(Number(item.product.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className='mt-5 space-y-3 border-b border-black/7 pb-5 text-sm dark:border-white/7'>
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

        <div className='mt-5 flex items-center justify-between text-lg font-semibold text-black dark:text-white'>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className='mt-6 grid grid-cols-2 gap-2'>
          <div className='rounded-2xl bg-black/3 p-3 dark:bg-white/5'>
            <ShieldCheck className='h-4 w-4 text-black/45 dark:text-white/45' />
            <p className='mt-2 text-[11px] font-medium text-black/45 dark:text-white/45'>
              Secure checkout
            </p>
          </div>
          <div className='rounded-2xl bg-black/3 p-3 dark:bg-white/5'>
            <PackageCheck className='h-4 w-4 text-black/45 dark:text-white/45' />
            <p className='mt-2 text-[11px] font-medium text-black/45 dark:text-white/45'>
              Tracked delivery
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
