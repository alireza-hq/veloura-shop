'use client'

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Theme } from '../types'

type ThemeStore = {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: 'dark',

      toggleTheme: () =>
        set((state) => {
          return { theme: state.theme === 'dark' ? 'light' : 'dark' }
        }),
    }),
    { name: 'theme-storage' },
  ),
)
