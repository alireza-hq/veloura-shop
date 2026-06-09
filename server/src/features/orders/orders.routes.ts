import { Router } from 'express';

import { asyncHandler } from '@/lib/asyncHandler';
import { authMiddleware } from '@/middlewares/auth.middleware';

import * as controller from './orders.controller';

const router = Router()

router.use(authMiddleware)

router.get('/', asyncHandler(controller.getOrders))
router.get('/:id', asyncHandler(controller.getOrder))

router.post('/', asyncHandler(controller.createOrder))
router.post('/:id/pay', asyncHandler(controller.payOrder))

export default router
