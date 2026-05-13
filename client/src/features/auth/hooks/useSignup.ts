import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { routes } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { SignupFormValues, signupSchema } from '../schemas/signupSchema'
import { signupService } from '../services/authApi'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { addCartItemService } from '@/features/cart/services/cartApi'

type SignupResponse = {
  user: {
    id: number
    username: string
    email: string
    role: 'user' | 'admin'
  }
}

export const useSignup = () => {
  const router = useRouter()

  const { setUser } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) })

  const signupMutation = useMutation({
    mutationFn: signupService,

    onSuccess: async (data: SignupResponse) => {
      setUser(data.user)

      const guestItems = useCartStore.getState().items

      for (const item of guestItems) {
        await addCartItemService({
          productId: item.productId,
          quantity: item.quantity,
        })
      }

      useCartStore.getState().clearCart()

      router.push(routes.auth.me)
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    signupMutation.mutate(data)
  }

  return {
    register,
    handleSubmit,
    onSubmit,

    errors,

    isPending: signupMutation.isPending,
    error: signupMutation.error,
  } as const
}
