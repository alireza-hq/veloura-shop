import React from 'react'

type Props = { children: React.ReactNode }

export const FitLayout = ({ children }: Props) => {
  return (
    <main className='bg-dot-pattern min-h-fit bg-zinc-50 dark:bg-black'>
      <div className='bg-black/90 py-12 dark:bg-transparent'></div>
      <div className='mx-auto max-w-7xl px-6 py-10 sm:py-36 md:py-48'>
        {children}
      </div>
    </main>
  )
}
