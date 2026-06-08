import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { routes } from '@/lib/routes';

import { BackgroundSlideshow } from './BackgroundSlideshow';

export const Hero = () => {
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
    <section className='relative flex min-h-screen flex-col justify-center overflow-hidden px-8 py-20 lg:px-20'>
      <BackgroundSlideshow
        className={'bg-left bg-no-repeat'}
        // -rotate-y-180
        images={images}
        duration={7000}
        fadeDuration={1}
      ></BackgroundSlideshow>

      <div className='absolute inset-0 bg-black/30 dark:bg-black/35'></div>

      <div className='relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-5 lg:mx-0 lg:gap-8'>
        <h1 className='text-4xl font-bold text-white sm:text-5xl lg:text-6xl'>
          Beauty that feels like you
        </h1>

        <h3 className='max-w-lg text-lg text-white/75 sm:text-xl'>
          Build your ritual with high-performance makeup, expressive color, and
          effortless essentials.
        </h3>

        <Link
          href={routes.products.root}
          className='group w-fit rounded-full border border-white/20 bg-white/15 px-8 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black'
        >
          <span className='flex items-center gap-2'>
            Explore Makeup
            <ArrowRightIcon className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </span>
        </Link>
      </div>
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/30 to-transparent dark:from-black/40' />
    </section>
  )
}
