import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { routes } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'

import { CheckoutFormValues, checkoutSchema } from '../schema'

import type { Dispatch, SetStateAction } from 'react'
import { createOrderService } from '@/features/orders/services/orderApi'

export const useCheckout = (
  setCheckoutMessage: Dispatch<SetStateAction<string>>,
) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const clearCart = useCartStore((state) => state.clearCart)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  })

  const createOrderMutation = useMutation({
    mutationFn: createOrderService,

    onSuccess: () => {
      setCheckoutMessage('Order placed successfully!')

      reset()
      clearCart()

      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['checkout'] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })

      setTimeout(() => {
        router.push(routes.orders)
      }, 2500)
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('shipping info', data)

    createOrderMutation.mutate()
  }

  return {
    register,
    onSubmit,
    handleSubmit,
    errors,
    isSubmitting: createOrderMutation.isPending,
    error: createOrderMutation.error,
  } as const
}
