import React from 'react';

type Props = { children: React.ReactNode }

export const FitLayout = ({ children }: Props) => {
  return (
    <main className='bg-dot-pattern min-h-screen'>
      <div className='bg-[#24191e] py-12'></div>
      <div className='mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 sm:py-20'>
        {children}
      </div>
    </main>
  )
}
