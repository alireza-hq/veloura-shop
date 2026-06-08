'use client'

import { MoonIcon, SunMediumIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)

  if (!mounted) {
    return <div className='h-5 w-5' />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type='button'
      aria-label='Toggle theme'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='transition duration-100 hover:scale-[107.5%] hover:opacity-95'
    >
      {isDark ? (
        <MoonIcon className='h-5 w-5' />
      ) : (
        <SunMediumIcon className='h-5 w-5 fill-current' />
      )}
    </button>
  )
}
