import { Router } from 'express';

import { asyncHandler } from '@/lib/asyncHandler';
import { authMiddleware } from '@/middlewares/auth.middleware';

import * as controller from './checkout.controller';

const router = Router()

router.post('/', authMiddleware, asyncHandler(controller.getCheckout))

export default router
