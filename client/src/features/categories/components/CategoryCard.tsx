import Link from 'next/link';

import { Category } from '../types';

type Props = Partial<Category>

export const CategoryCard = ({ image, route, title }: Props) => {
  return (
    <Link
      href={route ?? '#'}
      className='group relative block w-full overflow-hidden'
    >
      <img
        src={image ?? '/lol.jpg'}
        alt={title}
        className='aspect-4/5 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
      />
      <div className='absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 to-transparent transition-all duration-300 group-hover:h-1/2 group-active:h-8/12 group-active:opacity-90 dark:from-black/90' />
      <h3 className='absolute inset-x-0 bottom-10 z-10 text-center text-xl font-medium text-white sm:text-2xl lg:text-3xl'>
        {title}
      </h3>
    </Link>
  )
}
