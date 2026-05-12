'use client'

import { SubscribeForm } from './SubscribeForm';

export const HomeSubscribe = () => {
  return (
    <div className='mx-auto max-w-xl px-4 pt-12 pb-18 text-center'>
      <h3 className='text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white'>
        Subscribe to Our Newsletter
      </h3>
      <p className='mt-2 text-sm text-black/50 sm:text-base dark:text-white/50'>
        Get the latest updates on new products and upcoming sales.
      </p>
      <div className='mt-6'>
        <SubscribeForm />
      </div>
    </div>
  )
}
