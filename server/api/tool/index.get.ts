import { prisma } from "~/server/plugins/prisma";

export default defineEventHandler(async (event) => {
  const { currentPage = 0, pageSize = 10 } = getQuery(event);
  return await prisma.tool.findMany({
    skip: currentPage * pageSize,
    take: pageSize,
  });
});
