import { prisma } from "~/server/plugins/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const currentPage = parseInt((query.currentPage as string) ?? 0);
  const pageSize = parseInt((query.pageSize as string) ?? 10);
  const keyword = (query.keyword as string) ?? "";
  return await prisma.tool.findMany({
    skip: currentPage * pageSize,
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
    },
  });
});
