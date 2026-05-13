import { Router } from 'express'

import * as adminController from './admin.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { roleMiddleware } from '@/middlewares/role.middleware'
import { asyncHandler } from '@/lib/asyncHandler'

const router = Router()

router.get(
  '/stats',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(adminController.getAdminStats),
)

router.get(
  '/orders',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(adminController.getAdminOrders),
)

router.patch(
  '/orders/:id/status',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(adminController.updateOrderStatus),
)

export default router
