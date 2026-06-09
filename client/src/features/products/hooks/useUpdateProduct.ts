import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateProductData, updateProductService } from '../services/productApi'

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductData }) =>
      updateProductService(id, data),

    onSuccess: (updatedProduct, variables) => {
      queryClient.setQueryData(['product', variables.id], updatedProduct)

      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
