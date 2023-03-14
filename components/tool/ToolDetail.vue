<script lang="ts" setup>
import { ToolItem } from "~~/types";

const props = defineProps<{
  tool: ToolItem;
}>();
const { storageOptions } = useChatGPT();
const { send, loading, result, resultHtml } = useAi(props.tool.id!);

function submit(data: any) {
  if (storageOptions.value.apiKey) {
    send(data);
  } else {
    ElMessage.warning("Please set the API key first");
  }
}
</script>
<template>
  <div>
    <ToolHeader :tool="tool" />
    <Card relative>
      <ToolActions :tool="tool" />
      <ToolForms :loading="loading" @submit="submit" :tool="tool" />
      <ToolResult v-if="result" :html="resultHtml" />
    </Card>
  </div>
</template>
