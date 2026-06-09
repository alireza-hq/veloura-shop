'use client'

import { ArrowRight, Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { routes } from '@/lib/routes'

const principles = [
  {
    icon: ShieldCheck,
    title: 'Reliable by design',
    description:
      'Straightforward formulas, wearable color, and finishes that perform in real routines.',
  },
  {
    icon: Leaf,
    title: 'Considered choices',
    description:
      'We keep improving our ingredients, partners, and packaging with intention.',
  },
  {
    icon: Heart,
    title: 'Made for expression',
    description:
      'Beauty should feel personal and playful, never like another rule to follow.',
  },
]

export const About = () => {
  return (
    <div className='space-y-20 pb-8 sm:space-y-28'>
      <section className='grid min-h-[68vh] items-end gap-12 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-16'>
        <div>
          <p className='text-xs font-semibold tracking-[0.24em] text-rose-900/55 uppercase dark:text-rose-100/50'>
            Our point of view
          </p>
          <h1 className='mt-6 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.055em] text-black sm:text-7xl lg:text-8xl dark:text-white'>
            Beauty that leaves room for you.
          </h1>
          <p className='mt-8 max-w-xl text-base leading-8 text-black/52 sm:text-lg dark:text-white/52'>
            Veloura creates thoughtful makeup essentials for curious routines,
            quiet confidence, and every version of your style.
          </p>
          <Link
            href={routes.products.root}
            className='mt-9 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-75 dark:bg-white dark:text-black'
          >
            Explore the edit
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        <div className='relative min-h-96 overflow-hidden rounded-[2rem] bg-rose-100 lg:min-h-140 dark:bg-rose-950/25'>
          <Image
            src='/store.jpg'
            alt='Inside the Veloura studio'
            fill
            sizes='(min-width: 1024px) 40vw, 100vw'
            className='absolute inset-0 h-full w-full object-cover'
          />
          <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-7 pt-24 text-white'>
            <Sparkles className='h-5 w-5 text-white/70' />
            <p className='mt-3 max-w-sm text-sm leading-6 text-white/72'>
              A small studio with one clear goal: make choosing beauty feel
              simpler and more personal.
            </p>
          </div>
        </div>
      </section>

      <section className='grid gap-8 border-y border-black/8 py-10 sm:grid-cols-3 dark:border-white/10'>
        {[
          ['2024', 'Founded with a simpler vision'],
          ['30+', 'Purposeful beauty essentials'],
          ['100%', 'Made for individual expression'],
        ].map(([value, label]) => (
          <div key={label}>
            <p className='text-4xl font-semibold tracking-tight text-black dark:text-white'>
              {value}
            </p>
            <p className='mt-2 text-sm text-black/45 dark:text-white/45'>
              {label}
            </p>
          </div>
        ))}
      </section>

      <section className='grid gap-10 lg:grid-cols-[0.7fr_1.3fr]'>
        <div>
          <p className='text-xs font-semibold tracking-[0.22em] text-rose-900/55 uppercase dark:text-rose-100/50'>
            What guides us
          </p>
          <h2 className='mt-4 text-4xl font-semibold tracking-[-0.04em] text-black sm:text-5xl dark:text-white'>
            Less noise. Better choices.
          </h2>
        </div>

        <div className='divide-y divide-black/8 border-y border-black/8 dark:divide-white/10 dark:border-white/10'>
          {principles.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className='grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-6'
            >
              <span className='flex h-11 w-11 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black'>
                <Icon className='h-4 w-4' />
              </span>
              <div>
                <h3 className='text-lg font-semibold text-black dark:text-white'>
                  {title}
                </h3>
                <p className='mt-2 max-w-xl text-sm leading-7 text-black/50 dark:text-white/50'>
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='rounded-[2rem] bg-rose-100/70 px-6 py-12 sm:px-12 sm:py-16 dark:bg-rose-950/20'>
        <p className='max-w-4xl text-3xl leading-tight font-semibold tracking-[-0.035em] text-black sm:text-5xl dark:text-white'>
          We are not here to define beauty. We are here to give you better
          tools to define it for yourself.
        </p>
      </section>
    </div>
  )
}
