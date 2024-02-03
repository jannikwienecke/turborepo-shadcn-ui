import { PrismaClient } from "@prisma/client";

let global: {
  prisma?: PrismaClient;
} = {
  prisma: undefined,
};
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";
