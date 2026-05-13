'use client'

import { LoadingState } from '@/components/ui/LoadingState'

import { AdminOrdersHeader } from '@/features/admin/orders/components/AdminOrdersHeader'
import { AdminOrdersTable } from '@/features/admin/orders/components/AdminOrdersTable'
import { useAdminOrders } from '@/features/admin/orders/hooks/useAdminOrders'

export default function AdminOrdersPage() {
  const { data: orders = [], isLoading } = useAdminOrders()

  if (isLoading) return <LoadingState />

  return (
    <div>
      <AdminOrdersHeader />

      <AdminOrdersTable orders={orders} />
    </div>
  )
}
