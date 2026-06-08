import React from 'react'

type Props = { children: React.ReactNode }

export const ScreenLayout = ({ children }: Props) => {
  return (
    <main className='bg-dot-pattern min-h-screen dark:bg-black'>
      <div className='bg-zinc-950 py-12'></div>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        {children}
      </div>
    </main>
  )
}
