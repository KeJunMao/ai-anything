import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

export default defineNitroPlugin(async (nitroApp) => {
  await prisma.$connect();
});
