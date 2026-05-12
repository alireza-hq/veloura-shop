import React from 'react';

import { cn } from '@/lib/utils/cn';

type Props = {
  title?: string
  children: React.ReactNode
  className?: string
}

export const HomeSection = ({ title, children, className }: Props) => {
  return (
    <section className={cn('px-6 py-16 sm:px-12 lg:px-24 lg:py-8', className)}>
      {title && (
        <h2 className='mb-8 border-y-2 border-black px-4 py-4 text-center text-2xl font-bold backdrop-blur-[2px] sm:text-3xl dark:border-white dark:text-white'>
          {title}
        </h2>
      )}

      {children}
    </section>
  )
}
