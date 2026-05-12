'use client'

import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'

import { useSignup } from '../../hooks/useSignup'

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { register, onSubmit, handleSubmit, isPending, errors } = useSignup()

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-6'>
      <div className='space-y-2'>
        <label
          htmlFor='name'
          className='text-sm font-medium text-black/70 dark:text-white/70'
        >
          Full Name
        </label>
        <div className='relative'>
          <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/30 dark:text-white/30' />
          <input
            type='text'
            id='name'
            placeholder='John Doe'
            className='w-full rounded-xl border border-black/10 bg-zinc-50 py-3 pr-4 pl-10 text-sm text-black placeholder:text-black/30 focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white dark:focus:ring-white'
            {...register('username')}
          />
        </div>
        {errors.username && (
          <p className='text-xs text-red-500'>{errors.username.message}</p>
        )}
      </div>

      {/* Email Field */}
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

      <div className='space-y-2'>
        <label
          htmlFor='confirmPassword'
          className='text-sm font-medium text-black/70 dark:text-white/70'
        >
          Confirm Password
        </label>
        <div className='relative'>
          <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/30 dark:text-white/30' />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id='confirmPassword'
            placeholder='••••••••'
            className='w-full rounded-xl border border-black/10 bg-zinc-50 py-3 pr-10 pl-10 text-sm text-black placeholder:text-black/30 focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white dark:focus:ring-white'
            {...register('confirmPassword')}
          />

          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-black/30 hover:text-black dark:text-white/30 dark:hover:text-white'
          >
            {showConfirmPassword ? (
              <EyeOff className='h-4 w-4' />
            ) : (
              <Eye className='h-4 w-4' />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className='text-xs text-red-500'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={isPending}
        className='w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'
      >
        {isPending ? (
          <span className='flex items-center justify-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            Signing up...
          </span>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  )
}
