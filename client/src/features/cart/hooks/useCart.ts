import { useEffect } from 'react'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  addCartItemService,
  clearCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from '../services/cartApi'
import { useCartStore } from '../store/useCartStore'
import { ApiCart, CartItem } from '../types'
import { mapApiCartToStore } from '../utils/mapApiCartToStore'

export const useCart = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const items = useCartStore((state) => state.items)
  const setItems = useCartStore((state) => state.setItems)
  const addGuestItem = useCartStore((state) => state.addGuestItem)
  const removeGuestItem = useCartStore((state) => state.removeGuestItem)
  const clearGuestItem = useCartStore((state) => state.clearGuestItem)
  const clearGuestCart = useCartStore((state) => state.clearCart)

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getCartService,
    enabled: isAuthenticated,
  })

  const syncCart = (cart: ApiCart) => {
    setItems(mapApiCartToStore(cart))
  }

  useEffect(() => {
    if (cartQuery.data && isAuthenticated) {
      setItems(mapApiCartToStore(cartQuery.data))
    }
  }, [cartQuery.data, isAuthenticated, setItems])

  const addMutation = useMutation({
    mutationFn: addCartItemService,
    onSuccess: syncCart,
  })

  const updateMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number
      quantity: number
    }) => updateCartItemService(productId, quantity),

    onSuccess: syncCart,
  })

  const removeMutation = useMutation({
    mutationFn: removeCartItemService,
    onSuccess: syncCart,
  })

  const clearMutation = useMutation({
    mutationFn: clearCartService,
    onSuccess: syncCart,
  })

  const addItem = (item: CartItem) => {
    if (!isAuthenticated) {
      addGuestItem(item)
      return
    }

    addMutation.mutate({
      productId: item.productId,
      quantity: item.quantity,
    })
  }

  const removeItem = (productId: number) => {
    if (!isAuthenticated) {
      removeGuestItem(productId)
      return
    }

    const existing = items.find((item) => item.productId === productId)

    if (!existing) return

    if (existing.quantity <= 1) {
      removeMutation.mutate(productId)
      return
    }

    updateMutation.mutate({ productId, quantity: existing.quantity - 1 })
  }

  const clearItem = (productId: number) => {
    if (!isAuthenticated) {
      clearGuestItem(productId)
      return
    }

    removeMutation.mutate(productId)
  }

  const clearCart = () => {
    if (!isAuthenticated) {
      clearGuestCart()
      return
    }

    clearMutation.mutate()
  }

  return {
    items,
    addItem,
    removeItem,
    clearItem,
    clearCart,

    isLoading: cartQuery.isLoading,
    isPending:
      addMutation.isPending ||
      updateMutation.isPending ||
      removeMutation.isPending ||
      clearMutation.isPending,
  }
}
