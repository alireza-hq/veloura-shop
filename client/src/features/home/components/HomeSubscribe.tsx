'use client'

import { SubscribeForm } from './SubscribeForm'

export const HomeSubscribe = () => {
  return (
    <section
      id='newsletter'
      className='grid gap-8 border-t border-black/10 pt-10 sm:pt-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16 dark:border-white/10'
    >
      <div>
        <p className='text-xs font-semibold tracking-[0.22em] text-black/40 uppercase dark:text-white/40'>
          The Veloura edit
        </p>
        <h3 className='mt-4 max-w-xl text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white'>
          Beauty notes worth opening.
        </h3>
        <p className='mt-3 max-w-lg text-sm leading-6 text-black/50 sm:text-base dark:text-white/50'>
          A quiet monthly edit of new shades, practical guidance, and selected
          offers.
        </p>
      </div>

      <SubscribeForm />
    </section>
  )
}
