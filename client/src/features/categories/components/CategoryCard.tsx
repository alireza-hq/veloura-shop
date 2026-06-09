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
      <div className='absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 to-transparent transition-all duration-300 group-hover:h-1/2 group-active:h-8/12 group-active:opacity-90 dark:from-black/90' />
      <h3 className='absolute inset-x-0 bottom-7 z-10 px-4 text-center text-lg font-semibold tracking-tight text-white sm:text-2xl'>
        {title}
      </h3>
      {description && (
        <p className='absolute inset-x-0 bottom-3 z-10 hidden truncate px-5 text-center text-xs text-white/60 sm:block'>
          {description}
        </p>
      )}
    </Link>
  )
}
