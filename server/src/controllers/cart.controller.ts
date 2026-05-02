import type { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../middlewares/error.middleware";

export const getCartItems = async (req: Request, res: Response) => {
    const items = await prisma.cartItem.findMany({
        where: { userId: req.user!.id },
        include: {
            product: {
                select: {
                    id: true,
                    title: true,
                    image: true,
                    price: true,
                },
            },
        },
    });

    return res.json({ items });
};

export const addCartItem = async (req: Request, res: Response) => {
    const productId = req.params.productId as unknown as number;
    const { quantity } = req.body;

    const productExists = await prisma.product.findUnique({
        where: { id: productId },
        select: { id: true },
    });

    if (!productExists) throw new AppError(404, "Product not found");

    try {
        const item = await prisma.cartItem.create({
            data: {
                userId: req.user!.id,
                productId,
                quantity,
            },
            include: {
                product: {
                    select: { id: true, title: true, image: true, price: true },
                },
            },
        });

        return res.status(201).json({ item });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                const item = await prisma.cartItem.update({
                    where: {
                        userId_productId: { userId: req.user!.id, productId },
                    },
                    data: {
                        quantity: { increment: quantity },
                    },
                    include: {
                        product: {
                            select: {
                                id: true,
                                title: true,
                                image: true,
                                price: true,
                            },
                        },
                    },
                });
                return res.status(200).json({ item });
            }
        }
        throw err;
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    const productId = req.params.productId as unknown as number;
    const { quantity } = req.body;

    try {
        const item = await prisma.cartItem.update({
            where: {
                userId_productId: { userId: req.user!.id, productId },
            },
            data: {
                quantity,
            },
            include: {
                product: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        price: true,
                    },
                },
            },
        });

        return res.status(200).json({ item });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                throw new AppError(404, "Item not in cart");
            }
        }
        throw err;
    }
};

export const deleteCartItem = async (req: Request, res: Response) => {
    const productId = req.params.productId as unknown as number;

    try {
        await prisma.cartItem.delete({
            where: { userId_productId: { userId: req.user!.id, productId } },
        });

        return res.status(204).send();
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                throw new AppError(404, "Item not in cart");
            }
        }
        throw err;
    }
};
