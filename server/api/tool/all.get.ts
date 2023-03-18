import { prisma } from "~/server/plugins/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const currentPage = parseInt((query.currentPage as string) ?? 1);
  const pageSize = parseInt((query.pageSize as string) ?? 10);
  const keyword = (query.keyword as string) ?? "";
  const result = await prisma.$transaction([
    prisma.tool.count({
      where: {
        name: {
          startsWith: keyword,
          mode: "insensitive",
        },
      },
    }),
    prisma.tool.findMany({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      where: {
        name: {
          startsWith: keyword,
          mode: "insensitive",
        },
      },
      select: {
        icon: true,
        name: true,
        desc: true,
        id: true,
        author: true,
        chat: true,
      },
    }),
  ]);
  return {
    total: result[0] ?? 0,
    list: result[1],
  };
});
