import { Router } from 'express'

import * as adminController from './admin.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { roleMiddleware } from '@/middlewares/role.middleware'

const router = Router()

router.get(
  '/stats',
  authMiddleware,
  roleMiddleware('admin'),
  adminController.getAdminStats,
)

export default router
