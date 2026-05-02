import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import {
    checkout,
    getOrder,
    ordersList,
} from "../controllers/orders.controller";
import { validate } from "../middlewares/validate.middleware";
import { getOrderSchema } from "../schemas/orders.schema";

const ordersRouter = Router();

ordersRouter.use(authMiddleware);

ordersRouter.post("/checkout", asyncHandler(checkout));

ordersRouter.get("/", asyncHandler(ordersList));
ordersRouter.get("/:id", validate(getOrderSchema), asyncHandler(getOrder));

export default ordersRouter;
