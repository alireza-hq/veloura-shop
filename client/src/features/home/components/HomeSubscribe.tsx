'use client'

import { SubscribeForm } from './SubscribeForm';

export const HomeSubscribe = () => {
  return (
    <div
      id='newsletter'
      className='overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-10 text-white shadow-2xl shadow-black/10 sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-14 lg:px-14'
    >
      <div>
        <p className='text-xs font-semibold tracking-[0.22em] text-white/45 uppercase'>
          The Veloura edit
        </p>
        <h3 className='mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl'>
          Better beauty, less inbox noise.
        </h3>
        <p className='mt-4 max-w-lg text-sm leading-6 text-white/55 sm:text-base'>
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
