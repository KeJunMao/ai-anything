import getTools from "~/tools";
import { Tool } from "~~/tools/types";

// const reg = /^i18n.t\(['"](.*?)['"]\)$/;
// function setI18n(object: Record<string, any>, t: any) {
//   for (const key in object) {
//     if (Object.prototype.hasOwnProperty.call(object, key)) {
//       const element = object[key];
//       if (element.)
//     }
//   }
// }

export const useTools = () => {
  const { t } = useI18n();
  const tools = ref(getTools(t));
  return {
    tools: tools,
  };
};
