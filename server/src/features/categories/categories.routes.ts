import { Router } from 'express'
import * as controller from './categories.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { roleMiddleware } from '@/middlewares/role.middleware'
import { asyncHandler } from '@/lib/asyncHandler'

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
