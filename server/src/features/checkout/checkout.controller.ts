import type { Request, Response } from 'express'
import * as service from './checkout.service';

export const getCheckout = async (req: Request, res: Response) => {
  const checkout = await service.getCheckout(req.user!.userId)

  res.json(checkout)
}
