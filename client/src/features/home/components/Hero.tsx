 'use client'

import { ArrowRightIcon } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link';

import { routes } from '@/lib/routes';

import { BackgroundSlideshow } from './BackgroundSlideshow';

export const Hero = () => {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 700], [0, 130])
  const contentOpacity = useTransform(scrollY, [0, 620], [1, 0.18])
  const images = [
    // 'https://vimana-clothing.com/upload/banner/1770633926-banner-socks-2.png',
    // 'https://vimana-clothing.com/upload/banner/1773836142-pants-beneli.png',
    // 'https://vimana-clothing.com/upload/banner/1769504706-BANNER-BAGGY-1.png',
    // 'https://vimana-clothing.com/upload/banner/1775289197-lut.png',
    'banners/banner-1.jpg',
    'banners/banner-2.jpg',
    'banners/banner-3.jpg',
    // 'banners/banner-4.jpg',
    // 'banners/banner-5.jpg',
    // 'banners/banner-6.jpg',
  ]

  return (
    <section className='relative flex min-h-[92svh] flex-col justify-end overflow-hidden px-4 pt-28 pb-20 sm:px-8 sm:pb-24 lg:min-h-screen lg:justify-center lg:px-16'>
      <BackgroundSlideshow
        className={'bg-left bg-no-repeat'}
        // -rotate-y-180
        images={images}
        duration={7000}
        fadeDuration={1}
      ></BackgroundSlideshow>

      <div className='absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-black/10'></div>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className='relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-5 will-change-transform lg:gap-7'
      >
        <p className='text-xs font-semibold tracking-[0.24em] text-white/65 uppercase'>
          The modern makeup edit
        </p>
        <h1 className='max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl'>
          Beauty that feels like you
        </h1>

        <p className='max-w-xl text-base leading-7 text-white/70 sm:text-lg'>
          Build your ritual with high-performance makeup, expressive color, and
          effortless essentials.
        </p>

        <Link
          href={routes.products.root}
          className='group w-fit rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-white/85'
        >
          <span className='flex items-center gap-2'>
            Explore products
            <ArrowRightIcon className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </span>
        </Link>
      </motion.div>
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/30 to-transparent dark:from-black/40' />
    </section>
  )
}
