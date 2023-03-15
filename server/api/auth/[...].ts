import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";

const nuxtAuthHandler = NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-ignore
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
});
export default defineEventHandler(async (event) => {
  const result = await nuxtAuthHandler(event);
  const headerCookies = event.node.res.getHeader("set-cookie");
  console.log(headerCookies)
  console.log(typeof headerCookies)
  if (headerCookies && typeof headerCookies === "string") {
    event.node.res.removeHeader("set-cookie");
    event.node.res.setHeader("set-cookie", headerCookies.split(/,(?!\s)/));
  }
  console.log(event.node.res.getHeader("set-cookie"))
  console.log(typeof event.node.res.getHeader("set-cookie"))
  return result;
});
