'use client'

import { SubscribeForm } from './SubscribeForm';

export const HomeSubscribe = () => {
  return (
    <div
      id='newsletter'
      className='relative overflow-hidden rounded-[2rem] border border-black/8 bg-rose-100/65 px-6 py-10 text-black shadow-sm backdrop-blur-sm sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-14 lg:px-14 dark:border-white/10 dark:bg-rose-950/20 dark:text-white'
    >
      <div className='pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/55 blur-3xl dark:bg-rose-400/5' />
      <div>
        <p className='text-xs font-semibold tracking-[0.22em] text-rose-900/45 uppercase dark:text-rose-100/45'>
          The Veloura edit
        </p>
        <h3 className='mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl'>
          Better beauty, less inbox noise.
        </h3>
        <p className='mt-4 max-w-lg text-sm leading-6 text-black/50 sm:text-base dark:text-white/50'>
          A considered monthly note with new shades, useful guidance, and
          genuinely good offers.
        </p>
      </div>
      <div className='mt-8 lg:mt-0'>
        <SubscribeForm />
      </div>
    </div>
  )
}
