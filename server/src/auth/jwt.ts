import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { JwtPayload } from "jsonwebtoken";

type AccessTokenPayload = JwtPayload & { sub: number };

export const signAccessToken = (userId: number) => {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
    return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
};
