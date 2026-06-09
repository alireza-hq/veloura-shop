import { Router } from 'express';

import { asyncHandler } from '@/lib/asyncHandler';

import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import * as controller from './products.controller';
import * as reviewController from '../reviews/reviews.controller'

const router = Router()

router.get('/', asyncHandler(controller.getProducts))
router.get('/:productId/reviews', asyncHandler(reviewController.getReviews))
router.post(
  '/:productId/reviews',
  authMiddleware,
  asyncHandler(reviewController.saveReview),
)
router.get('/:id', asyncHandler(controller.getProduct))

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(controller.createProduct),
)

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(controller.updateProduct),
)

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  asyncHandler(controller.deleteProduct),
)

export default router
