import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
    createCategorySchema,
    getCategorySchema,
} from "../schemas/categories.schema";
import { asyncHandler } from "../utils/asyncHandler";
import {
    categoryList,
    createCategory,
    getCategory,
} from "../controllers/categories.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const categoryRouter = Router();

categoryRouter.get("/", asyncHandler(categoryList));
categoryRouter.get(
    "/:id",
    validate(getCategorySchema),
    asyncHandler(getCategory),
);

categoryRouter.post(
    "/",
    authMiddleware,
    validate(createCategorySchema),
    asyncHandler(createCategory),
);

export default categoryRouter;
