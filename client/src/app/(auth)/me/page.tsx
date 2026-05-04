'use client'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { UserProfile } from '@/features/auth/components/UserProfile'

import { AuthGuard } from '@/features/auth/components/AuthGuard'

export default function UserProfilePage() {
  return (
    <ScreenLayout>
      <AuthGuard>
        <UserProfile />
      </AuthGuard>
    </ScreenLayout>
  )
}
