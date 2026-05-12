'use client'

import axios from 'axios';
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
    const { data } = await axios.post('/api/subs', { email })
    reset()
  }

  return (
    <>
      <form
        className='mx-auto flex max-w-sm justify-center gap-0'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className='relative'>
          <input
            {...register('email')}
            type='email'
            placeholder='Enter your email'
            className={cn(
              'peer min-w-0 flex-1 rounded-l-full border border-black/10 bg-white px-5 py-2.5 text-sm text-black placeholder:text-black/30 focus:border-black focus:outline-none dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white dark:focus:ring-white',
              errors.email && 'border-red-600 focus:border-red-600',
            )}
          />
          {errors.email && (
            <span className='absolute top-full left-5 mt-1.5 text-xs text-red-600'>
              {errors.email?.message}
            </span>
          )}
          {isSubmitSuccessful && (
            <span className='absolute top-full left-5 mt-1.5 text-xs text-green-600'>
              Email added successfully
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className='shrink-0 rounded-r-full border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-black/90 active:bg-black/85 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/90 dark:active:bg-white/85'
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </>
  )
}
