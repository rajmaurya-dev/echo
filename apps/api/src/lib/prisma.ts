import { PrismaClient } from "../generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPrisma = (databaseUrl: string) => {
  return new PrismaClient({
    accelerateUrl: databaseUrl,
  }).$extends(withAccelerate());
};

export type ExtendedPrismaClient = ReturnType<typeof getPrisma>;
