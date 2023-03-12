import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";

export default defineNuxtPlugin(() => {
  const storage = createStorage({
    driver: localStorageDriver({ base: "ai-anything" }),
  });
  return {
    provide: {
      storage,
    },
  };
});
