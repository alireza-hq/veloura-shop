import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { AppError } from "./error.middleware";

type RequestSchema = z.ZodType<{
    body?: unknown;
    params?: unknown;
    query?: unknown;
}>;

export const validate =
    (schema: RequestSchema) =>
    (req: Request, _res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            if (parsed.body !== undefined) req.body = parsed.body as any;
            if (parsed.params !== undefined) req.params = parsed.params as any;

            return next();
        } catch (err) {
            if (err instanceof ZodError) {
                throw new AppError(
                    400,
                    err.issues[0]?.message ?? "Invalid request",
                    err.flatten(),
                );
            }
            throw err;
        }
    };
