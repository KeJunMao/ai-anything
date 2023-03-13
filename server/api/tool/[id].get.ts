import { prisma } from "~/server/plugins/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  return await prisma.tool.findFirst({
    where: {
      id,
    },
  });
});
