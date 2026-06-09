'use client'

import { useMemo } from 'react';
import { MdShoppingCart } from 'react-icons/md';

import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { CartFooter } from '@/features/cart/components/CartFooter';
import { CartItemList } from '@/features/cart/components/CartItemList';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { routes } from '@/lib/routes';

export default function CartPage() {
  const cart = useCartStore()
  const items = useMemo(() => cart.items ?? [], [cart.items])

  if (!items.length) {
    return (
      <EmptyState
        icon={MdShoppingCart}
        title='Your cart is empty'
        buttonText='Explore products'
        route={routes.products.root}
      >
        Your beauty bag is ready whenever inspiration strikes.
      </EmptyState>
    )
  }
  return (
    <main className='page-shell'>
      <div className='page-content'>
        <PageHeader
          eyebrow='Your selection'
          title='Your beauty bag'
          description={`${items.length} ${items.length === 1 ? 'product' : 'products'} selected. Review the details before checkout.`}
        />
        <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start'>
          <CartItemList />
          <CartFooter />
        </div>
      </div>
    </main>
  )
}
