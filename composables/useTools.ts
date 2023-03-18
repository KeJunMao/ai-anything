import { ToolItem } from "~~/types";

const tools = ref<ToolItem[]>([])

export const initializeTools = async () => {
  const { tools: local } = useLocalTools();
  const { tools: remote } = await useAsyncRemoteTools();
  watchEffect(()=>{
    tools.value = [
      ...local.value.filter((v) => !remote.value.find((r) => r.id === v.id)),
      ...remote.value,
    ]
  })
  return tools
};

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
