import React from 'react';

type Props = { children: React.ReactNode }

export const ScreenLayout = ({ children }: Props) => {
  return (
    <main className='bg-dot-pattern min-h-screen dark:bg-black'>
      <div className='bg-black/90 py-12 dark:bg-transparent'></div>
      <div className='mx-auto max-w-7xl px-6 py-10'>{children}</div>
    </main>
  )
}
