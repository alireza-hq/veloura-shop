'use client'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { Me } from '@/features/auth/components/UserProfile'

import { AuthGuard } from '@/features/auth/components/AuthGuard'

export default function MePage() {
  return (
    <ScreenLayout>
      <AuthGuard>
        <Me />
      </AuthGuard>
    </ScreenLayout>
  )
}
