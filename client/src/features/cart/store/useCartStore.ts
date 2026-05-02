import { create } from 'zustand'
import { CartItem } from '../types'
import { persist } from 'zustand/middleware'

type CartStore = {
  items: CartItem[]

  addItem: (item: CartItem) => void
  removeItem: (productId: number) => void
  clearItem: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],

      addItem: (item) =>
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
      removeItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clearItem: (productId) =>
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
