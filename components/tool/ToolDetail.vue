<script lang="ts" setup>
import { ToolItem } from "~~/types";
const emits = defineEmits(["update:historyId"]);
const props = defineProps<{
  tool: ToolItem;
}>();
const { storageOptions } = useChatGPT();
const tool = computed(() => props.tool);
const {
  send,
  loading,
  result,
  resultHtml,
  cancel,
  contexts,
  reset,
  toggleHistory,
} = useAi(tool);
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

defineExpose({
  toggleHistory,
});
</script>
<template>
  <div flex flex-col style="height: calc(100vh - 125px)">
    <el-scrollbar height="100%">
      <div p-4 sm:p-10>
        <ToolResult v-if="!tool.chat" :html="resultHtml" />
        <ToolChatResult
          v-else
          :contexts="contexts"
          :result="result"
          :loading="loading"
        />
      </div>
    </el-scrollbar>
    <div px-4>
      <ToolActions :tool="tool" />
      <ToolForms
        :loading="loading"
        @submit="submit"
        @stop="stop"
        @reset="handleReset"
        :tool="tool"
      />
    </div>
  </div>
</template>
