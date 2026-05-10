import { Router } from 'express';

import { asyncHandler } from '@/lib/asyncHandler';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { roleMiddleware } from '@/middlewares/role.middleware';

import * as controller from './users.controller';

const router = Router()

router.get(
  '.',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(controller.getUsers),
)
router.get('/me', authMiddleware, asyncHandler(controller.getUser))

export default router
