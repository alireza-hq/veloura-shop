import type { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AppError } from "../middlewares/error.middleware";

export const checkout = async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const order = await prisma.$transaction(async (tx) => {
        const items = await tx.cartItem.findMany({
            where: { userId },
            select: {
                productId: true,
                product: { select: { title: true, price: true } },
                quantity: true,
            },
        });

        if (items.length === 0) throw new AppError(400, "Your cart is empty");

        let total = 0;
        items.forEach((item) => {
            total += Number(item.product.price) * item.quantity;
        });

        const order = await tx.order.create({
            data: {
                userId,
                total,
                status: "PENDING",
            },
        });

        await Promise.all(
            items.map((item) =>
                tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        titleSnapshot: item.product.title,
                        priceSnapshot: item.product.price,
                    },
                }),
            ),
        );

        await tx.cartItem.deleteMany({
            where: { userId },
        });

        return order;
    });

    return res.status(201).json(order);
};

export const ordersList = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "desc" },
    });

    return res.json(orders);
};

export const getOrder = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    const order = await prisma.order.findFirst({
        where: { id, userId: req.user!.id },
        include: { orderItems: true },
    });

    if (!order) throw new AppError(404, "Order not found");

    return res.json(order);
};
