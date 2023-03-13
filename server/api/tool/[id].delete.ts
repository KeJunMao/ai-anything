import { prisma } from "~/server/plugins/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  const id = event.context.params?.id;
  const tool = await prisma.tool.findFirst({
    where: {
      id,
    },
  });
  if (tool && tool.author === session?.user?.email) {
    return await prisma.tool.delete({
      where: {
        id: tool.id,
      },
    });
  }
  throw createError({
    statusCode: 401,
  });
});
