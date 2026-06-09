import Link from 'next/link'

import { Category } from '../types'
import { routes } from '@/lib/routes'

type Props = Category

export const CategoryCard = ({ image, title, description }: Props) => {
  return (
    <Link
      href={`${routes.products.root}?category=${encodeURIComponent(title)}`}
      className='group relative block w-full overflow-hidden rounded-3xl bg-black shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl'
    >
      <img
        src={image}
        alt={title}
        className='aspect-4/5 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
      />
      <div className='absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/90 via-black/35 to-transparent transition-all duration-300 group-hover:h-2/3 dark:from-black' />
      <div className='absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7'>
        <p className='text-[10px] font-semibold tracking-[0.2em] text-white/55 uppercase'>
          Shop collection
        </p>
        <h3 className='mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl'>
          {title}
        </h3>
        <p className='mt-2 line-clamp-2 text-xs leading-5 text-white/65 sm:text-sm'>
          {description || `Explore every ${title.toLowerCase()} essential.`}
        </p>
        <span className='mt-4 inline-flex text-xs font-semibold text-white transition group-hover:translate-x-1'>
          Browse products &rarr;
        </span>
      </div>
    </Link>
  )
}
