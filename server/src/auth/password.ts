import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};
