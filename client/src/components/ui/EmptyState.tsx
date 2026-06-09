import Link from 'next/link';
import React from 'react';
import { IconBaseProps } from 'react-icons/lib';

type Props = {
  icon: React.ComponentType<IconBaseProps>
  title: string
  children: React.ReactNode
  buttonText: string
  buttonIcon?: React.ComponentType<IconBaseProps>
  route: string
}

export const EmptyState = ({
  icon: Icon,
  title,
  children,
  buttonText,
  buttonIcon: ButtonIcon,
  route,
}: Props) => {
  return (
    <main className='page-shell'>
      <div className='page-content flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center'>
        <div className='rounded-full bg-black/7 p-6 dark:bg-white/7'>
          <Icon className='h-10 w-10 text-black/30 dark:text-white/30' />
        </div>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold text-black dark:text-white'>
            {title}
          </h2>
          <p className='text-sm text-black/50 dark:text-white/50'>{children}</p>
        </div>
        <Link
          href={route}
          className='mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:opacity-85 active:opacity-80 dark:bg-white dark:text-black'
        >
          {ButtonIcon && <ButtonIcon className='h-4 w-4' />}
          {buttonText}
        </Link>
      </div>
    </main>
  )
}
