import { prisma } from "~/server/plugins/prisma";

export default defineEventHandler(async (event) => {
  return await prisma.tool.findMany({
    skip: currentPage * pageSize,
    take: pageSize,
  });
});
