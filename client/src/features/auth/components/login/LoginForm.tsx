'use client'

import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { useLogin } from '../../hooks/useLogin'

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { onSubmit, register, handleSubmit, isSubmitting, errors } = useLogin()

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-6'>
      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='text-sm font-medium text-black/70 dark:text-white/70'
        >
          Email
        </label>
        <div className='relative'>
          <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/30 dark:text-white/30' />
          <input
            type='email'
            id='email'
            placeholder='you@example.com'
            className='w-full rounded-xl border border-black/10 bg-zinc-50 py-3 pr-4 pl-10 text-sm text-black placeholder:text-black/30 focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white dark:focus:ring-white'
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className='text-xs text-red-500'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='password'
          className='text-sm font-medium text-black/70 dark:text-white/70'
        >
          Password
        </label>
        <div className='relative'>
          <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/30 dark:text-white/30' />
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            placeholder='••••••••'
            className='w-full rounded-xl border border-black/10 bg-zinc-50 py-3 pr-10 pl-10 text-sm text-black placeholder:text-black/30 focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white dark:focus:ring-white'
            {...register('password')}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-black/30 hover:text-black dark:text-white/30 dark:hover:text-white'
          >
            {showPassword ? (
              <EyeOff className='h-4 w-4' />
            ) : (
              <Eye className='h-4 w-4' />
            )}
          </button>
        </div>
        {errors.password && (
          <p className='text-xs text-red-500'>{errors.password.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition-all hover:opacity-85 active:opacity-80 disabled:opacity-70 dark:bg-white dark:text-black'
      >
        {isSubmitting ? (
          <span className='flex items-center justify-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            Logging in...
          </span>
        ) : (
          'Login'
        )}
      </button>
    </form>
  )
}
