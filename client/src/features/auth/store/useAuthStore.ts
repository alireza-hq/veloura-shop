import { create } from 'zustand'
import { User } from '../types'
import { persist } from 'zustand/middleware'

type AuthStore = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  login: ({
    id,
    name,
    email,
  }: {
    id: number
    name: string
    email: string
  }) => void

  logout: () => void
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: ({ id, name, email }) => {
        set({ isLoading: true })

        const user: User = {
          id,
          name,
          email,
        }

        set({ user: user, isAuthenticated: true, isLoading: false })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isLoading: false })
      },
    }),
    { name: 'account' },
  ),
)
