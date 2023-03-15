import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
    // @ts-ignore
    GoogleProvider.default({
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret,
    }),
  ],
});
export default defineEventHandler(async (event) => {
  const result = await nuxtAuthHandler(event);
  const headerCookies = event.node.res.getHeader("set-cookie");
  if (headerCookies && typeof headerCookies === "string") {
    const sessionToken = headerCookies
      .split(/,(?!\s)/)
      .find((v) => v.includes("session-token"));
    if (sessionToken) {
      event.node.res.removeHeader("set-cookie");
      event.node.res.setHeader("set-cookie", sessionToken);
    }
  }
  return result;
});
