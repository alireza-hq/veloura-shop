import { Router } from 'express'

import { asyncHandler } from '@/lib/asyncHandler'
import { authMiddleware } from '@/middlewares/auth.middleware'

import * as controller from './wishlist.controller'

const router = Router()

router.use(authMiddleware)

router.get('/', asyncHandler(controller.getWishlist))

router.post('/', asyncHandler(controller.addToWishlist))

router.delete('/:productId', asyncHandler(controller.removeFromWishlist))

export default router
