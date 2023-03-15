import { ToolItem } from "~~/types";

const initializeTools = async () => {
  const { tools: local } = useLocalTools();
  const { tools: remote } = await useAsyncRemoteTools();
  return computed<ToolItem[]>(() => {
    return [
      ...local.value.filter((v) => !remote.value.find((r) => r.id === v.id)),
      ...remote.value,
    ];
  });
};

const tools = await initializeTools();

export const useTools = () => {
  const { data } = useSession();
  const isRemoteTool = (id: string) => !id.includes("-");
  const isLocalTool = (id: string) => !isRemoteTool(id);
  const isOwnTool = (tool: ToolItem) => tool.author === data.value?.user?.email;
  return {
    tools,
    isLocalTool,
    isRemoteTool,
    isOwnTool,
  };
};
