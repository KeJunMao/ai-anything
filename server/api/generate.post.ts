import tools from "@/data/tools";
import { sendStream } from "h3";
import { Readable } from "stream";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const tool = tools.find((v) => v.name === body.tool);
  if (!tool) {
    throw createError({
      statusCode: 404,
      statusMessage: `${body.tool} is not found!`,
    });
  }

  const message = tool.promptTemplate.replace(/\${(.*?)}/gm, function (_, $1) {
    return body.prompt[$1];
  });
  const response = await $fetch("https://c-api.okmiku.com/ai/chat", {
    method: "post",
    body: {
      input: message,
    },
    responseType: "stream",
  });
  // @ts-expect-error
  const stream = Readable.fromWeb(response);
  return sendStream(event, stream);
});
