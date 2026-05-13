'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { logoutService } from '../services/authApi'
import { routes } from '@/lib/routes'
import { useCartStore } from '@/features/cart/store/useCartStore'

export const useLogout = () => {
  const router = useRouter()

  const logout = useAuthStore((state) => state.logout)

  const logoutMutation = useMutation({
    mutationFn: logoutService,

    onSuccess: () => {
      logout()

      useCartStore.getState().clearCart()
      router.push(routes.auth.login)
    },

    onError: (error) => {
      console.error(error)
    },
  })

  return {
    logout: logoutMutation.mutate,

    isPending: logoutMutation.isPending,
  } as const
}
