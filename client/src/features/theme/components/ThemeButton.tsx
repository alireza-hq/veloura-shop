'use client'

import { MoonIcon, SunMediumIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className='h-5 w-5' />
  }

  const isDark = theme === 'dark'

  return (
    <button
      type='button'
      aria-label='Toggle theme'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='transition duration-100 hover:scale-[107.5%] hover:opacity-95'
    >
      {theme === 'dark' ? (
        <MoonIcon className='h-5 w-5' />
      ) : (
        <SunMediumIcon className='h-5 w-5 fill-white text-white' />
      )}
    </button>
  )
}
