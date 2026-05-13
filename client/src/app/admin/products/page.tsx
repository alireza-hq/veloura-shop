'use client'

import { LoadingState } from '@/components/ui/LoadingState'
import { useProducts } from '@/features/products/hooks/useProducts'

import { AdminProductsHeader } from '@/features/admin/products/components/AdminProductsHeader'
import { AdminProductsTable } from '@/features/admin/products/components/AdminProductsTable'

export default function AdminProductsPage() {
  const { data: products = [], isLoading } = useProducts()

  if (isLoading) return <LoadingState />

  return (
    <div>
      <AdminProductsHeader />

      <AdminProductsTable products={products} />
    </div>
  )
}
