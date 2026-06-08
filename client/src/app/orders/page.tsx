'use client'

import { BiShoppingBag } from 'react-icons/bi'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingState } from '@/components/ui/LoadingState'
import { PageHeader } from '@/components/ui/PageHeader'
import { OrderList } from '@/features/orders/components/OrderList'
import { useOrders } from '@/features/orders/hooks/useOrders'
import { routes } from '@/lib/routes'

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={BiShoppingBag}
        title='No orders yet'
        buttonText='Browse Makeup'
        route={routes.products.root}
      >
        Your first Veloura order will appear here.
      </EmptyState>
    )
  }

  return (
    <ScreenLayout>
      <PageHeader
        eyebrow='Account'
        title='Your orders'
        description='Track every Veloura delivery and revisit your past beauty picks.'
      />
      <OrderList orders={orders} />
    </ScreenLayout>
  )
}
