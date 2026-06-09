'use client'

import { LoadingState } from '@/components/ui/LoadingState'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { routes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AdminSidebar } from './AdminSidebar'

type Props = { children: React.ReactNode }

export const AdminLayout = ({ children }: Props) => {
  const router = useRouter()

  const { user, isLoading, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push(routes.auth.login)
      return
    }

    if (user?.role !== 'admin') {
      router.push(routes.home)
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading) {
    return <LoadingState />
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  return (
    <div className='bg-dot-pattern min-h-screen'>
      <div className='bg-[#24191e] py-12' />
      <div className='min-h-screen lg:grid lg:grid-cols-[240px_1fr]'>
        <AdminSidebar />

        <main className='min-w-0 p-4 sm:p-6 lg:p-8'>{children}</main>
      </div>
    </div>
  )
}
