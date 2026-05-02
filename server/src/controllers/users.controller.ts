import type { Request, Response } from "express";
import { AppError } from "../middlewares/error.middleware";
import { prisma } from "../db/prisma";
import { Prisma } from "../generated/prisma/client";

export const userList = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) throw new AppError(404, "User not found");

    return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    if (req.user!.id !== id) throw new AppError(403, "Forbidden");

    try {
        const updated = await prisma.user.update({
            where: { id },
            data: req.body,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return res.json(updated);
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new AppError(409, "User with that email already exists.");
            }

            if (err.code === "P2025") {
                throw new AppError(404, "User not found");
            }
        }
        throw err;
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    if (id !== req.user!.id) throw new AppError(403, "Forbidden");

    try {
        await prisma.user.delete({ where: { id } });
        return res.status(204).send();
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                throw new AppError(
                    404,
                    "User not found",
                );
            }
        }
        throw err;
    }
};
