'use client'

import { MdShoppingCart } from 'react-icons/md';

import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { CheckoutSummary } from '@/features/checkout/components/CheckoutSummary';
import { routes } from '@/lib/routes';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)

  if (!items.length) {
    return (
      <EmptyState
        icon={MdShoppingCart}
        title='Your cart is empty'
        buttonText='Explore Makeup'
        route={routes.products.root}
      >
        Add a few beauty essentials before heading to checkout.
      </EmptyState>
    )
  }

  return (
    <main className='page-shell'><div className='page-content'>
      <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6'>
        <PageHeader
          eyebrow='Almost yours'
          title='Checkout'
          description='Review your beauty bag and choose where we should send it.'
        />
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </div>
    </div></main>
  )
}
