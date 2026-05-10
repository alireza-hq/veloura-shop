import { Router } from 'express';

import { asyncHandler } from '@/lib/asyncHandler';

import * as controller from './auth.controller';

const router = Router()

router.post('/signup', asyncHandler(controller.signup))
router.post('/login', asyncHandler(controller.login))

export default router
