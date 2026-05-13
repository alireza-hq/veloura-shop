import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartItem } from '../types'

type CartStore = {
  items: CartItem[]

  setItems: (items: CartItem[]) => void

  addGuestItem: (item: CartItem) => void
  removeGuestItem: (productId: number) => void
  clearGuestItem: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],

      setItems: (items) => set({ items }),

      addGuestItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId,
          )

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            }
          }
          return {
            items: [...state.items, item],
          }
        }),

      removeGuestItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clearGuestItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId ? { ...i, quantity: 0 } : i))
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' },
  ),
)
