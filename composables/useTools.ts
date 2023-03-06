import tools from "~/data/tools";

export const useTools = () => {
  return {
    tools: ref(tools),
  };
};
