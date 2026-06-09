'use client'

import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

import { routes } from '@/lib/routes';

export default function NotFound() {
  return (
    <main className='page-shell'><div className='page-content'>
      <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
        <h1 className='text-8xl font-extrabold tracking-tighter text-zinc-200 dark:text-zinc-800'>
          404
        </h1>

        <div className='mt-8 max-w-md space-y-4'>
          <h2 className='text-2xl font-bold text-zinc-900 dark:text-white'>
            Page Not Found
          </h2>

          <p className='text-zinc-600 dark:text-zinc-400'>
            This page is no longer in the collection. It may have moved or
            become unavailable.
          </p>

          <div className='flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center'>
            <Link
              href={routes.home}
              className='inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200'
            >
              <Home className='h-4 w-4' />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className='inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'
            >
              <ArrowLeft className='h-4 w-4' />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div></main>
  )
}
