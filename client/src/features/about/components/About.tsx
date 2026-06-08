'use client'

import { Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react'

const values = [
  {
    icon: ShieldCheck,
    title: 'Performance first',
    desc: 'Comfortable formulas, dependable wear, and thoughtful finishes.',
  },
  {
    icon: Leaf,
    title: 'Mindful choices',
    desc: 'Considered partners and packaging choices, improved over time.',
  },
  {
    icon: Heart,
    title: 'Beauty without rules',
    desc: 'Products designed for expression, not perfection.',
  },
]

export const About = () => {
  return (
    <div className='space-y-16 sm:space-y-24'>
      <section className='relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-16 text-white sm:px-10 sm:py-24 lg:px-16'>
        <div className='pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-rose-300/15 blur-3xl' />
        <div className='relative max-w-3xl'>
          <p className='text-xs font-semibold tracking-[0.24em] text-white/45 uppercase'>
            About Veloura
          </p>
          <h1 className='mt-5 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl'>
            Beauty, made more personal.
          </h1>
          <p className='mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg'>
            We create modern makeup essentials that invite experimentation while
            staying effortless enough for every day.
          </p>
        </div>

        <div className='relative mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3'>
          {[
            ['2024', 'Veloura founded'],
            ['30+', 'Curated essentials'],
            ['Every day', 'Made for real routines'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className='text-2xl font-semibold'>{value}</p>
              <p className='mt-1 text-xs tracking-wide text-white/40 uppercase'>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className='mb-10 max-w-2xl'>
          <p className='text-xs font-semibold tracking-[0.22em] text-black/45 uppercase dark:text-white/45'>
            What guides us
          </p>
          <h2 className='mt-3 text-3xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white'>
            Less noise. Better beauty.
          </h2>
        </div>

        <div className='grid gap-5 md:grid-cols-3'>
          {values.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className='rounded-3xl border border-black/8 bg-white/70 p-7 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/4'
            >
              <span className='inline-flex rounded-full bg-black p-3 text-white dark:bg-white dark:text-black'>
                <Icon className='h-5 w-5' />
              </span>
              <h3 className='mt-6 text-lg font-semibold text-black dark:text-white'>
                {title}
              </h3>
              <p className='mt-2 text-sm leading-6 text-black/50 dark:text-white/50'>
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='grid overflow-hidden rounded-[2rem] border border-black/8 bg-white/65 shadow-sm lg:grid-cols-2 dark:border-white/10 dark:bg-white/4'>
        <div className='relative min-h-80 overflow-hidden lg:min-h-130'>
          <img
            src='store.jpg'
            alt='Veloura studio'
            className='absolute inset-0 h-full w-full object-cover'
          />
        </div>
        <div className='flex flex-col justify-center p-7 sm:p-12 lg:p-16'>
          <Sparkles className='h-6 w-6 text-black/35 dark:text-white/35' />
          <h2 className='mt-6 text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white'>
            Our story
          </h2>
          <p className='mt-5 text-base leading-7 text-black/55 dark:text-white/55'>
            Veloura began with a simple idea: makeup should feel expressive,
            approachable, and never overwhelming. We focus on versatile color,
            reliable formulas, and clear guidance.
          </p>
          <p className='mt-4 text-base leading-7 text-black/55 dark:text-white/55'>
            Our mission remains simple: help every beauty routine feel more
            intentional, playful, and completely personal.
          </p>
        </div>
      </section>
    </div>
  )
}
