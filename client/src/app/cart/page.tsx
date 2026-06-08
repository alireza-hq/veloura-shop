'use client'

import { useMemo } from 'react';
import { MdShoppingCart } from 'react-icons/md';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
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
        buttonText='Explore Makeup'
        route={routes.products.root}
      >
        Your beauty bag is ready whenever inspiration strikes.
      </EmptyState>
    )
  }
  return (
    <ScreenLayout>
      <div className='mx-auto max-w-4xl px-4 py-12'>
        <PageHeader
          eyebrow='Your selection'
          title='Beauty bag'
          description='Review your picks, adjust quantities, and continue when everything feels right.'
        />
        <CartItemList />
        <CartFooter />
      </div>
    </ScreenLayout>
  )
}
