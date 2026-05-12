'use client'

import { Heart, Shield, Truck, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className='flex flex-col gap-20'>
      {/* Hero Section */}
      <section className='text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white'>
          Redefining Modern E-Commerce
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
          We believe in quality, sustainability, and the joy of discovery. Our
          curated collection brings you the finest products with a seamless
          shopping experience.
        </p>
      </section>

      {/* Mission & Values Grid */}
      <section className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {[
          {
            icon: Shield,
            title: 'Quality First',
            desc: 'Every product is vetted for durability and style.',
          },
          {
            icon: Truck,
            title: 'Fast Shipping',
            desc: 'Free express delivery on all orders over $50.',
          },
          {
            icon: Heart,
            title: 'Ethical Sourcing',
            desc: 'We partner with suppliers who respect people and planet.',
          },
          {
            icon: Users,
            title: 'Community',
            desc: 'Join a community of style-conscious shoppers.',
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
            Founded in 2024, we started with a simple idea: online shopping
            shouldn't be overwhelming. We strip away the clutter and focus on
            what matters—great products, fair prices, and exceptional service.
          </p>
          <p className='mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Today, we serve thousands of customers worldwide, but our mission
            remains the same: to make your life easier and more stylish, one
            package at a time.
          </p>
        </div>
      </section>
    </div>
  )
}
