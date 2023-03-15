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

  const { id, ...body } = await readBody(event);
  return await prisma.tool.create({
    data: {
      ...body,
      author: session.user?.email,
    },
  });
});
