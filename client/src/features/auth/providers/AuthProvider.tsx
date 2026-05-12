'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { getCurrentUserService } from '../services/authApi'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const setUser = useAuthStore((state) => state.setUser)

  const setIsLoading = useAuthStore((state) => state.setIsLoading)

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true)
        const user = await getCurrentUserService()

        setUser(user)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [setUser, setIsLoading])

  return children
}
