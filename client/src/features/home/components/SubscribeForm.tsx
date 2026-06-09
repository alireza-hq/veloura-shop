'use client'

import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';

import { subscribeSchema } from '../schemas/subscribeSchema';

export const SubscribeForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(subscribeSchema) })

  const onSubmit = async ({ email }: { email: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 350))
    void email
    reset()
  }

  return (
    <>
      <form
        className='flex w-full flex-col gap-3 sm:flex-row'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className='relative min-w-0 flex-1'>
          <input
            {...register('email')}
            type='email'
            placeholder='Enter your email'
            className={cn(
              'peer w-full rounded-full border border-black/8 bg-white/80 px-5 py-3.5 text-sm text-black shadow-sm placeholder:text-black/30 transition focus:border-black/20 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-black/15 dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/25 dark:focus:bg-black/25',
              errors.email && 'border-red-600 focus:border-red-600',
            )}
          />
          {errors.email && (
            <span className='mt-1.5 block pl-5 text-xs text-red-600 dark:text-red-300'>
              {errors.email?.message}
            </span>
          )}
          {isSubmitSuccessful && (
            <span className='mt-1.5 block pl-5 text-xs text-emerald-700 dark:text-emerald-300'>
              Welcome to the Veloura edit
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className='shrink-0 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:opacity-75 disabled:opacity-50 dark:bg-white dark:text-[#24191e]'
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </>
  )
}
