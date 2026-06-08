import Link from 'next/link';

import { routes } from '@/lib/routes';

import { LoginForm } from './LoginForm';

export const LoginCard = () => {
  return (
    <div className='mx-auto w-full max-w-md rounded-3xl border border-black/8 bg-white/75 p-6 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-10 dark:border-white/10 dark:bg-white/5'>
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
