import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
};
