import { prisma } from "~/server/plugins/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "authenticated",
    });
  }
  const { id, ...body } = await readBody(event);
  // local tool
  if (id.includes("-")) {
    return await prisma.tool.create({
      data: {
        ...body,
        author: session.user?.email,
      },
    });
  } else {
    // remote tool
    let tool = await prisma.tool.findFirst({
      where: {
        id,
      },
    });
    if (tool && tool.author === session.user?.email) {
      return await prisma.tool.update({
        where: {
          id: tool.id,
        },
        data: {
          ...body,
        },
      });
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
      });
    }
  }
});
