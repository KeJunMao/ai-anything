import { PrismaClient, Prisma } from "@prisma/client";
export const prisma = new PrismaClient();

export default defineNitroPlugin(async (nitroApp) => {
  await prisma.$connect();
});
