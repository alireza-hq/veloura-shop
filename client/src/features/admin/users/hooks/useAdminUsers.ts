'use client'

import { useQuery } from '@tanstack/react-query'

import { getAdminUsersService } from '../services/adminUsersApi'

export const useAdminUsers = () =>
  useQuery({
    queryKey: ['admin-users'],
    queryFn: getAdminUsersService,
  })
