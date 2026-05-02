'use client'

import { useEffect } from 'react'

import { useThemeStore } from '../store/useTheme'

export const ThemeInitializer = () => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return null
}
