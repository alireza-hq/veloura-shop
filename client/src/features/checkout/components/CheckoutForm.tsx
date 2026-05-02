'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { BiCreditCard } from 'react-icons/bi'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { cn } from '@/lib/utils/cn'

import { useCheckout } from '../hooks/useCheckout'
import { CheckoutModal } from './CheckoutModal'

export const CheckoutForm = () => {
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const items = useCartStore((state) => state.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const { register, onSubmit, handleSubmit, errors, isSubmitting } =
    useCheckout(setCheckoutMessage)

  if (checkoutMessage)
    return <CheckoutModal checkoutMessage={checkoutMessage} />

  return (
    <div className='lg:col-span-2'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8 dark:border-white/5 dark:bg-zinc-900'
        noValidate
      >
        <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>
          Shipping Information
        </h2>

        <div className='space-y-5'>
          {/* Name */}
          <div>
            <label
              htmlFor='name'
              className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'
            >
              Full Name
            </label>
            <input
              className={cn(
                'w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white',
                errors.name && 'border-red-600',
              )}
              type='text'
              id='name'
              placeholder='John Doe'
              {...register('name')}
            />
            {errors.name && (
              <p className='mt-1 text-xs text-red-500'>{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor='address'
              className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'
            >
              Address
            </label>
            <input
              className={cn(
                'w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white',
                errors.address && 'border-red-600',
              )}
              type='text'
              id='address'
              placeholder='123 Main St, City, Country'
              {...register('address')}
            />
            {errors.address && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor='phone'
              className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'
            >
              Phone Number
            </label>
            <input
              className={cn(
                'w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white',
                errors.phone && 'border-red-600',
              )}
              type='tel'
              id='phone'
              placeholder='+1 234 567 890'
              {...register('phone')}
            />
            {errors.phone && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 active:opacity-85 disabled:opacity-70 dark:bg-white dark:text-black'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='h-4 w-4 animate-spin' />
              Processing...
            </>
          ) : (
            <>
              <BiCreditCard className='h-4 w-4' />
              Pay ${total.toFixed(2)}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
