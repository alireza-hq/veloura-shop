'use client'

import { Heart, Shield, Truck, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className='flex flex-col gap-20'>
      {/* Hero Section */}
      <section className='text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white'>
          Beauty, made more personal
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
          Veloura creates modern makeup essentials that invite experimentation
          while staying effortless enough for every day.
        </p>
      </section>

      {/* Mission & Values Grid */}
      <section className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {[
          {
            icon: Shield,
            title: 'Performance First',
            desc: 'Comfortable formulas, lasting color, and thoughtful finishes.',
          },
          {
            icon: Truck,
            title: 'Easy Delivery',
            desc: 'Free express delivery on beauty orders over $50.',
          },
          {
            icon: Heart,
            title: 'Mindful Choices',
            desc: 'We choose partners who respect people and the planet.',
          },
          {
            icon: Users,
            title: 'Community',
            desc: 'A welcoming space for beauty lovers and creative routines.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className='group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700'
          >
            <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'>
              <item.icon className='h-6 w-6' />
            </div>
            <h3 className='text-lg font-semibold text-zinc-900 dark:text-white'>
              {item.title}
            </h3>
            <p className='mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400'>
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
        <div className='relative aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800'>
          <img
            src='store.jpg'
            alt='Our Office'
            className='h-full w-full object-cover'
          />
        </div>
        <div>
          <h2 className='text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white'>
            Our Story
          </h2>
          <p className='mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Founded in 2024, Veloura began with a simple idea: makeup should
            feel expressive, approachable, and never overwhelming. We focus on
            versatile color, reliable formulas, and clear guidance.
          </p>
          <p className='mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Our mission remains simple: help every beauty routine feel more
            intentional, playful, and completely personal.
          </p>
        </div>
      </section>
    </div>
  )
}
