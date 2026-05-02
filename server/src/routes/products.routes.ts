import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    listProducts,
    updateProduct,
} from "../controllers/products.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    listProductsSchema,
    updateProductSchema,
} from "../schemas/products.schema";

const productRouter = Router();

productRouter.get("/", validate(listProductsSchema), asyncHandler(listProducts));
productRouter.get("/:id", validate(getProductSchema), asyncHandler(getProduct));

productRouter.post(
    "/",
    authMiddleware,
    validate(createProductSchema),
    asyncHandler(createProduct),
);

productRouter.patch(
    "/:id",
    authMiddleware,
    validate(updateProductSchema),
    asyncHandler(updateProduct),
);

productRouter.delete(
    "/:id",
    authMiddleware,
    validate(deleteProductSchema),
    asyncHandler(deleteProduct),
);

export default productRouter;
