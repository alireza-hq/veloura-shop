import Link from 'next/link';

import { routes } from '@/lib/routes';

import { SignupForm } from './SignupForm';

export const SignupCard = () => {
  return (
    <div className='mx-auto max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-sm sm:p-10 dark:border-white/5 dark:bg-zinc-900'>
      <div className='mb-8 text-center'>
        <h1 className='text-2xl font-bold text-black dark:text-white'>
          Create Account
        </h1>
        <p className='mt-2 text-sm text-black/50 dark:text-white/50'>
          Enter your details to get started
        </p>
      </div>

      <SignupForm />

      <p className='mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400'>
        Already have an account?{' '}
        <Link
          href={routes.auth.login}
          className='font-medium text-black hover:text-black/80 hover:underline dark:text-zinc-200 dark:hover:text-white'
        >
          Login
        </Link>
      </p>
    </div>
  )
}
