'use client'

import { Clock3, Loader2, LockKeyhole, MapPin, Phone, UserRound } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils/cn'

import { useCheckout } from '../hooks/useCheckout'
import { CheckoutModal } from './CheckoutModal'
import { useCheckoutPreview } from '../hooks/useCheckoutPreview'

export const CheckoutForm = () => {
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const { data } = useCheckoutPreview()
  const total = Number(data?.total ?? 0)

  const { register, onSubmit, handleSubmit, errors, isSubmitting } =
    useCheckout(setCheckoutMessage)

  if (checkoutMessage)
    return <CheckoutModal checkoutMessage={checkoutMessage} />

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-[2rem] border border-black/7 bg-white/75 p-5 shadow-sm backdrop-blur-sm sm:p-8 dark:border-white/8 dark:bg-white/4'
        noValidate
      >
        <div className='mb-8 flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold tracking-[0.18em] text-black/35 uppercase dark:text-white/35'>
              Step 2 of 3
            </p>
            <h2 className='mt-2 text-2xl font-semibold tracking-tight text-black dark:text-white'>
              Delivery details
            </h2>
            <p className='mt-2 text-sm text-black/45 dark:text-white/45'>
              Where should we send your Veloura order?
            </p>
          </div>
          <div className='rounded-full bg-black/5 p-3 dark:bg-white/7'>
            <MapPin className='h-5 w-5 text-black/55 dark:text-white/55' />
          </div>
        </div>

        <div className='grid gap-5 sm:grid-cols-2'>
          {/* Name */}
          <div className='sm:col-span-2'>
            <label
              htmlFor='name'
              className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'
            >
              <span className='flex items-center gap-2'>
                <UserRound className='h-4 w-4 opacity-45' />
                Full name
              </span>
            </label>
            <input
              className={cn(
                'w-full rounded-2xl border border-black/10 bg-black/2 px-4 py-3.5 text-sm text-black placeholder:text-black/25 transition focus:border-black/30 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/3 dark:text-white dark:placeholder:text-white/25 dark:focus:border-white/30 dark:focus:bg-white/5',
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
          <div className='sm:col-span-2'>
            <label
              htmlFor='address'
              className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'
            >
              <span className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 opacity-45' />
                Delivery address
              </span>
            </label>
            <input
              className={cn(
                'w-full rounded-2xl border border-black/10 bg-black/2 px-4 py-3.5 text-sm text-black placeholder:text-black/25 transition focus:border-black/30 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/3 dark:text-white dark:placeholder:text-white/25 dark:focus:border-white/30 dark:focus:bg-white/5',
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
              <span className='flex items-center gap-2'>
                <Phone className='h-4 w-4 opacity-45' />
                Phone number
              </span>
            </label>
            <input
              className={cn(
                'w-full rounded-2xl border border-black/10 bg-black/2 px-4 py-3.5 text-sm text-black placeholder:text-black/25 transition focus:border-black/30 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/3 dark:text-white dark:placeholder:text-white/25 dark:focus:border-white/30 dark:focus:bg-white/5',
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

        <div className='mt-8 flex gap-3 rounded-2xl bg-black/3 p-4 text-xs leading-5 text-black/50 dark:bg-white/5 dark:text-white/50'>
          <Clock3 className='mt-0.5 h-4 w-4 shrink-0' />
          Your order will be reserved for one hour. Complete payment from your
          orders page to confirm it.
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#2a1c23] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-85 disabled:opacity-60 dark:bg-white dark:text-[#2a1c23]'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='h-4 w-4 animate-spin' />
              Processing...
            </>
          ) : (
            <>
              <LockKeyhole className='h-4 w-4' />
              Reserve order · ${total.toFixed(2)}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
