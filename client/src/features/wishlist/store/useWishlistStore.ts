import { create } from 'zustand'

import { Product } from '@/features/products/types'

type WishlistStore = {
  products: Product[]

  addProduct: (product: Product) => void
  removeProduct: (productId: number) => void
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => {
      const existing = state.products.some((p) => p.id === product.id)

      if (existing) {
        return state
      }

      return { products: [...state.products, product] }
    }),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
}))
