import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";

export default NuxtAuthHandler({
  providers: [
    // @ts-ignore
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
    }),
  ],
});
