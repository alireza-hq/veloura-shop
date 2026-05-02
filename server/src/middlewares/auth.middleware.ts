import type { NextFunction, Request, Response } from "express";
import { AppError } from "./error.middleware";
import { verifyAccessToken } from "../auth/jwt";

export const authMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const header = req.headers.authorization;

    if (!header) throw new AppError(401, "Authorization header missing");

    if (!header.startsWith("Bearer "))
        throw new AppError(401, "Invalid authorization format");

    const token = header.slice("Bearer ".length).trim();

    if (!token) throw new AppError(401, "Token missing");
    try {
        const payload = verifyAccessToken(token);
        req.user = { id: payload.sub };
        next();
    } catch {
        throw new AppError(401, "Invalid or expired token");
    }
};
