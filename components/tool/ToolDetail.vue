<script lang="ts" setup>
import { ToolItem } from "~~/types";

const props = defineProps<{
  tool: ToolItem;
}>();
const { storageOptions } = useChatGPT();
const tool = computed(() => props.tool);
const { send, loading, result, resultHtml } = useAi(tool);

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
    <Card relative class="group">
      <ToolActions :tool="tool" />
      <ToolForms :loading="loading" @submit="submit" :tool="tool" />
      <ToolResult v-if="result" :html="resultHtml" />
    </Card>
  </div>
</template>
