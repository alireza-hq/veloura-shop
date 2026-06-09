'use client'

import { MdCheck, MdShoppingCart } from 'react-icons/md';

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
        buttonText='Explore products'
        route={routes.products.root}
      >
        Add a few beauty essentials before heading to checkout.
      </EmptyState>
    )
  }

  return (
    <main className='page-shell'>
      <div className='page-content'>
        <div className='mx-auto max-w-6xl py-6 sm:py-10'>
          <PageHeader
            eyebrow='Secure checkout'
            title='Complete your order'
            description='Add your delivery details, review your order, then reserve it for payment.'
          />

          <div className='mb-8 grid grid-cols-3 gap-2 border-y border-black/8 py-4 dark:border-white/8'>
            {['Bag reviewed', 'Delivery details', 'Payment'].map((step, index) => (
              <div
                key={step}
                className='flex items-center gap-2 text-xs font-semibold text-black/40 sm:text-sm dark:text-white/40'
              >
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2a1c23] text-[11px] text-white dark:bg-white dark:text-[#2a1c23]'>
                  {index === 0 ? <MdCheck className='h-3.5 w-3.5' /> : index + 1}
                </span>
                <span className='hidden sm:inline'>{step}</span>
              </div>
            ))}
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-8'>
          <CheckoutForm />
          <CheckoutSummary />
          </div>
        </div>
      </div>
    </main>
  )
}
