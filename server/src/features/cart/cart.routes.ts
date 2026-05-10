import { Router } from 'express';

import { asyncHandler } from '@/lib/asyncHandler';
import { authMiddleware } from '@/middlewares/auth.middleware';

import * as controller from './cart.controller';

const router = Router()

router.use(authMiddleware)

router.get('/', asyncHandler(controller.getCart))

router.post('/items', asyncHandler(controller.addCartItem))

router.patch('/items/:productId', asyncHandler(controller.updateCartItem))

router.delete('/items/:productId', asyncHandler(controller.removeCartItem))

export default router
