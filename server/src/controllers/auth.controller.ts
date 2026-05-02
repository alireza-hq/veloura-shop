import type { Request, Response } from "express";
import { AppError } from "../middlewares/error.middleware";
import { prisma } from "../db/prisma";
import { Prisma } from "../generated/prisma/client";
import { hashPassword, verifyPassword } from "../auth/password";
import { signAccessToken } from "../auth/jwt";

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const passwordHash = await hashPassword(password);

    try {
        const user = await prisma.user.create({
            data: { name, email, passwordHash },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const token = signAccessToken(user.id);

        return res.status(201).json({ token, user });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new AppError(409, "User with that email already exists");
            }
        }

        throw err;
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            passwordHash: true,
        },
    });

    if (!user) throw new AppError(401, "Invalid credentials");

    const match = await verifyPassword(password, user.passwordHash);

    if (!match) throw new AppError(401, "Invalid credentials");

    const token = signAccessToken(user.id);

    const { passwordHash, ...safeUser } = user;

    return res.status(200).json({
        token,
        user: safeUser,
    });
};

export const me = async (req: Request, res: Response) => {
    if (!req.user) throw new AppError(401, "Unauthorized");

    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) throw new AppError(401, "No longer authorized");

    return res.json(user);
};
