import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value || value.trim() === "") {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

const PORT_RAW = process.env.PORT ?? "3000";
const PORT = Number(PORT_RAW);

if (Number.isNaN(PORT) || PORT <= 0) {
    throw new Error(`Invalid PORT: "${PORT_RAW}"`);
}

const DATABASE_URL = requireEnv("DATABASE_URL");

const JWT_SECRET = requireEnv("JWT_SECRET");
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ??
    "1d") as SignOptions["expiresIn"];

export const env = Object.freeze({
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV ?? "development",
});
