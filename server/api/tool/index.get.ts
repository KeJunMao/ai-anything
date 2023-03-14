import { prisma } from "~/server/plugins/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  let { currentPage = 0, pageSize = 10 } = getQuery(event);
  if (session?.user?.email) {
    return await prisma.tool.findMany({
      skip: currentPage * pageSize,
      take: pageSize,
      where: {
        author: session?.user?.email,
      },
    });
  }
  return [];
});
