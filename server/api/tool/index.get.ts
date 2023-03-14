import { prisma } from "~/server/plugins/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (session) {
    return await prisma.tool.findMany({
      where: {
        author: session?.user?.email ?? "",
      },
    });
  }
  return [];
});
