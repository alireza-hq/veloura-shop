'use client'

import { SubscribeForm } from './SubscribeForm';

export const HomeSubscribe = () => {
  return (
    <div id='newsletter' className='mx-auto max-w-xl px-4 pt-12 pb-18 text-center'>
      <h3 className='text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white'>
        Join the Veloura edit
      </h3>
      <p className='mt-2 text-sm text-black/50 sm:text-base dark:text-white/50'>
        Get first access to new shades, beauty notes, and limited releases.
      </p>
      <div className='mt-6'>
        <SubscribeForm />
      </div>
    </div>
  )
}
