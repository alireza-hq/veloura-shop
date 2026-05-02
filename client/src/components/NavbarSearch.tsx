import { SearchIcon } from 'lucide-react'
import React from 'react'

export const NavbarSearch = () => {
  return (
    <div className='relative hidden w-full max-w-50 drop-shadow-lg md:block md:max-w-none'>
      <input
        type='text'
        placeholder='Search products...'
        className='w-full rounded-full bg-zinc-50/15 px-6 py-2 placeholder:text-gray-50/90 focus:outline-none dark:bg-zinc-800/50 dark:placeholder:text-white/90'
      />
      <button className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-200 hover:opacity-85 active:opacity-75 dark:text-gray-400/90'>
        <SearchIcon />
      </button>
    </div>
  )
}
