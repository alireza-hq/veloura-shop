import { Router } from "express";
import {
    deleteUser,
    getUser,
    updateUser,
    userList,
} from "../controllers/users.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    deleteUserSchema,
    getUserSchema,
    updateUserSchema,
} from "../schemas/users.schema";

const userRouter = Router();

userRouter.get("/", asyncHandler(userList));
userRouter.get("/:id", validate(getUserSchema), asyncHandler(getUser));

userRouter.patch(
    "/:id",
    authMiddleware,
    validate(updateUserSchema),
    asyncHandler(updateUser),
);

userRouter.delete(
    "/:id",
    authMiddleware,
    validate(deleteUserSchema),
    asyncHandler(deleteUser),
);

export default userRouter;
