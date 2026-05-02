'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { routes } from '@/lib/routes'

type Props = {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useAuthStore()

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(routes.auth.login)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return <>{children}</>
}
