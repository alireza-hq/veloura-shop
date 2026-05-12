'use client'

import { BiShoppingBag } from 'react-icons/bi';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { OrderList } from '@/features/orders/components/OrderList';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { routes } from '@/lib/routes';

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={BiShoppingBag}
        title='No orders yet'
        buttonText='Browse Products'
        route={routes.products.root}
      >
        Looks like you haven't made any purchases.
      </EmptyState>
    )
  }

  return (
    <ScreenLayout>
      <h1 className='mb-10 text-3xl font-bold text-black dark:text-white'>
        Your Orders
      </h1>
      <OrderList orders={orders} />
    </ScreenLayout>
  )
}
