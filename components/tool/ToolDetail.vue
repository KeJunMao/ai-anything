<script lang="ts" setup>
import { ToolItem } from "~~/types";

const props = defineProps<{
  tool: ToolItem;
}>();
const { storageOptions } = useChatGPT();
const tool = computed(() => props.tool);
const { send, loading, result, resultHtml, cancel, contexts, reset } =
  useAi(tool);
function submit(data: any) {
  if (storageOptions.value.apiKey) {
    send(data);
  } else {
    ElMessage.warning("Please set the API key first");
  }
}
function stop() {
  cancel();
}

function handleReset() {
  reset();
}
</script>
<template>
  <div>
    <ToolHeader :tool="tool" />
    <Card relative class="group" px-0>
      <template v-if="tool.chat">
        <ToolChatResult
          :contexts="contexts"
          :result="result"
          :loading="loading"
        />
        <el-divider />
      </template>
      <div px-4>
        <ToolActions :tool="tool" />
        <ToolForms
          :loading="loading"
          @submit="submit"
          @stop="stop"
          @reset="handleReset"
          :tool="tool"
        />
        <ToolResult v-if="!tool.chat && result" :html="resultHtml" />
      </div>
    </Card>
  </div>
</template>
