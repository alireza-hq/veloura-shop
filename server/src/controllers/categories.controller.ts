import type { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AppError } from "../middlewares/error.middleware";
import { Prisma } from "../generated/prisma/client";
import { slugify } from "../utils/slugify";


export const categoryList = async (req: Request, res: Response) => {
    return res.json(await prisma.category.findMany());
};
export const getCategory = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) throw new AppError(404, "Category not found");

    return res.status(200).json(category);
};

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    const baseSlug = slugify(name);
    if (!baseSlug) throw new AppError(400, "Invalid category name");

    let slug = baseSlug;

    for (let i = 0; i < 50; i++) {
        const exists = await prisma.category.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!exists) break;
        slug = `${baseSlug}-${i}`;
    }

    try {
        const category = await prisma.category.create({
            data: { name, slug },
            select: {
                id: true,
                name: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return res.status(201).json(category);
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new AppError(
                    409,
                    "Category with that name already exists",
                );
            }
        }

        throw err;
    }
};
