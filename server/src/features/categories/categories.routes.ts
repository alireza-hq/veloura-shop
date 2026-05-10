import { Router } from 'express';

import { asyncHandler } from '@/lib/asyncHandler';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { roleMiddleware } from '@/middlewares/role.middleware';

import * as controller from './categories.controller';

const router = Router()

router.get('/', asyncHandler(controller.getCategories))
router.get('/:id', asyncHandler(controller.getCategory))

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(controller.createCategory),
)

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(controller.updateCategory),
)

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(controller.deleteCategory),
)

export default router
