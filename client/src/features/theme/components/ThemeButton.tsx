'use client'

import { MoonIcon, SunMediumIcon } from 'lucide-react'

import { useThemeStore } from '../store/useTheme'

export const ThemeButton = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className='transition duration-100 hover:scale-[107.5%] hover:opacity-95'
    >
      {theme === 'dark' ? (
        <MoonIcon className='text-none h-5 w-5' />
      ) : (
        <SunMediumIcon className='h-5 w-5 fill-white text-white' />
      )}
    </button>
  )
}
