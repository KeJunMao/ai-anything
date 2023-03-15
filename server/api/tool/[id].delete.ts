import { prisma } from "~/server/plugins/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "unauthenticated",
    });
  }
  const id = event.context.params?.id;
  const author = session.user?.email as string;

  return await prisma.tool.deleteMany({
    where: {
      id,
      author,
    },
  });
});
