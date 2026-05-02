import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { routes } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'

import { CheckoutFormValues, checkoutSchema } from '../schema'

import type { Dispatch, SetStateAction } from 'react'

export const useCheckout = (
  setCheckoutMessage: Dispatch<SetStateAction<string>>,
) => {
  const router = useRouter()
  const clearCart = useCartStore((state) => state.clearCart)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(checkoutSchema) })

  const onSubmit = async (data: CheckoutFormValues) => {
    await new Promise((res) => setTimeout(res, 1500))
    setCheckoutMessage('Order placed successfully!')
    console.log(data)
    reset()
    clearCart()
    setTimeout(() => {
      router.push(routes.products.root)
    }, 2500)
  }

  return { register, onSubmit, handleSubmit, errors, isSubmitting } as const
}
