import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signup, login, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { signupSchema, loginSchema} from "../schemas/auth.schema";

const authRouter = Router();

authRouter.get("/me", authMiddleware, asyncHandler(me));

authRouter.post("/signup", validate(signupSchema), asyncHandler(signup));
authRouter.post("/login", validate(loginSchema), asyncHandler(login));

export default authRouter;
