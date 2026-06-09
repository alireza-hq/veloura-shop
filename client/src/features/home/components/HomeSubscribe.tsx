'use client'

import { ArrowDownRight, Mail, Sparkles } from 'lucide-react'

import { SubscribeForm } from './SubscribeForm'

export const HomeSubscribe = () => {
  return (
    <section
      id='newsletter'
      className='relative overflow-hidden rounded-[2.25rem] bg-[#ead7dc] px-5 py-5 text-[#2a1c23] shadow-sm sm:px-7 sm:py-7 dark:bg-[#302229] dark:text-[#fff7fa]'
    >
      <div className='pointer-events-none absolute -top-28 right-[8%] h-64 w-64 rounded-full bg-white/45 blur-3xl dark:bg-rose-200/5' />
      <div className='pointer-events-none absolute -bottom-20 left-[28%] h-48 w-48 rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-400/5' />

      <div className='relative grid gap-4 lg:grid-cols-[0.68fr_1.32fr]'>
        <div className='flex min-h-60 flex-col justify-between rounded-[1.75rem] bg-[#2a1c23] p-6 text-white sm:p-8 dark:bg-[#f6e9ed] dark:text-[#2a1c23]'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase opacity-65'>
              <Mail className='h-4 w-4' />
              Monthly note
            </span>
            <ArrowDownRight className='h-5 w-5 opacity-50' />
          </div>

          <div>
            <p className='max-w-xs text-lg leading-snug font-medium'>
              One thoughtful beauty edit. No daily noise.
            </p>
            <div className='mt-5 flex gap-2 text-[11px] font-medium tracking-wide uppercase opacity-55'>
              <span>New shades</span>
              <span>/</span>
              <span>Useful rituals</span>
              <span>/</span>
              <span>Offers</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-between rounded-[1.75rem] border border-black/6 bg-white/55 p-6 backdrop-blur-sm sm:p-9 dark:border-white/8 dark:bg-white/4'>
          <div>
            <div className='flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-rose-950/45 uppercase dark:text-rose-100/45'>
              <Sparkles className='h-4 w-4' />
              The Veloura edit
            </div>
            <h3 className='mt-5 max-w-2xl text-3xl leading-[1.05] font-semibold tracking-tight sm:text-5xl'>
              A little more glow in your inbox.
            </h3>
            <p className='mt-4 max-w-xl text-sm leading-6 text-black/50 sm:text-base dark:text-white/50'>
              Discover considered formulas, practical guidance, and early
              access to the things worth knowing.
            </p>
          </div>

          <div className='mt-8 max-w-2xl'>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  )
}
