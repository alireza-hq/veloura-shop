import React from 'react'
import { ScreenLayout } from './layout/ScreenLayout'

type Props = {
  error: Error
}

export const ErrorState = ({ error }: Props) => {
  const buttonClickHandler = () => window.location.reload()

  return (
    <ScreenLayout>
      <div className='text-center sm:mt-32 md:mt-48'>
        <h2 className='mb-2 text-xl font-bold text-black dark:text-white'>
          Something went wrong
        </h2>

        <p className='text-sm text-black/50 dark:text-white/50'>
          {error.message}
        </p>

        <button
          onClick={buttonClickHandler}
          className='mt-4 rounded-full border border-black/10 bg-black px-6 py-2 text-sm text-white transition hover:bg-white hover:text-black dark:border-white/10 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'
        >
          Try Again
        </button>
      </div>
    </ScreenLayout>
  )
}
