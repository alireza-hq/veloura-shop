import Link from 'next/link'

import { LoginForm } from './LoginForm'
import { routes } from '@/lib/routes'

export const LoginCard = () => {
  return (
    <div className='mx-auto max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-sm sm:p-10 dark:border-white/5 dark:bg-zinc-900'>
      <div className='mb-8 text-center'>
        <h1 className='text-2xl font-bold text-black dark:text-white'>
          Welcome back
        </h1>
        <p className='mt-2 text-sm text-black/50 dark:text-white/50'>
          Please enter your details to sign in
        </p>
      </div>

      <LoginForm />

      <div className='mt-6 flex items-center justify-between text-sm'>
        <Link
          href='/forgot-password'
          className='text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white'
        >
          Forgot password?
        </Link>
        <Link
          href={routes.auth.signup}
          className='font-medium text-black hover:underline dark:text-white'
        >
          Create account
        </Link>
      </div>
    </div>
  )
}
