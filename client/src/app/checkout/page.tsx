'use client'

import { MdShoppingCart } from 'react-icons/md'

import { EmptyState } from '@/components/EmptyState'
import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm'
import { routes } from '@/lib/routes'
import { CheckoutSummary } from '@/features/checkout/components/CheckoutSummary'

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)

  if (!items.length) {
    return (
      <EmptyState
        icon={MdShoppingCart}
        title='Your cart is empty'
        buttonText='Start Shopping'
        route={routes.products.root}
      >
        Looks like you haven't added anything yet.
      </EmptyState>
    )
  }

  return (
    <ScreenLayout>
      <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6'>
        <h1 className='mb-8 px-4 text-3xl font-bold text-black dark:text-white'>
          Checkout
        </h1>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </div>
    </ScreenLayout>
  )
}
