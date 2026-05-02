import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
    addCartItem,
    deleteCartItem,
    getCartItems,
    updateCartItem,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    addCartItemSchema,
    deleteCartItemSchema,
    updateCartItemSchema,
} from "../schemas/cart.schema";
import { validate } from "../middlewares/validate.middleware";

const cartRouter = Router();

cartRouter.use(authMiddleware);

cartRouter.get("/", asyncHandler(getCartItems));

cartRouter.post(
    "/items/:productId",
    validate(addCartItemSchema),
    asyncHandler(addCartItem),
);

cartRouter.patch(
    "/items/:productId",
    validate(updateCartItemSchema),
    asyncHandler(updateCartItem),
);

cartRouter.delete(
    "/items/:productId",
    validate(deleteCartItemSchema),
    asyncHandler(deleteCartItem),
);

export default cartRouter;
