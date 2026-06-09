import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateCategoryData, updateCategory } from '../services/categoryApi'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryData }) =>
      updateCategory(id, data),

    onSuccess: (updatedCategory, variables) => {
      queryClient.setQueryData(['category', variables.id], updatedCategory)

      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })
}
