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
              'peer w-full rounded-full border border-white/12 bg-white/8 px-5 py-3.5 text-sm text-white placeholder:text-white/35 transition focus:border-white/30 focus:bg-white/12 focus:outline-none',
              errors.email && 'border-red-600 focus:border-red-600',
            )}
          />
          {errors.email && (
            <span className='mt-1.5 block pl-5 text-xs text-red-300'>
              {errors.email?.message}
            </span>
          )}
          {isSubmitSuccessful && (
            <span className='mt-1.5 block pl-5 text-xs text-emerald-300'>
              Welcome to the Veloura edit
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className='shrink-0 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition duration-200 hover:bg-white/85 disabled:opacity-50'
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </>
  )
}
