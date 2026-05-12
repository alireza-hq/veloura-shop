'use client'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { UserProfile } from '@/features/auth/components/UserProfile'

export default function UserProfilePage() {
  return (
    <ScreenLayout>
      <UserProfile />
    </ScreenLayout>
  )
}
