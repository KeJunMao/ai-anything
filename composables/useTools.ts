import tools from "~/data/tools";

export const useTools = () => {
  return {
    tools: useState("tools", () => tools),
  };
};
