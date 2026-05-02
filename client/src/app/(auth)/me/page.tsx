'use client'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { Me } from '@/features/auth/components/Me'
import { AuthGuard } from '@/middlewares/AuthGuard'

export default function MePage() {
  return (
    <ScreenLayout>
      <AuthGuard>
        <Me />
      </AuthGuard>
    </ScreenLayout>
  )
}
