'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateUserRoleService } from '../services/adminUsersApi'

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserRoleService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}
