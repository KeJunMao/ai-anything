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
  const setCookie = event.node.res.getHeader("set-cookie")
  console.log('start---------')
  console.log(setCookie);
  console.log('end---------')
  return result;
});
