<script lang="ts" setup>
import { ToolItem } from "~~/types";
const props = defineProps<{
  tool: ToolItem;
}>();
const {
  send,
  loading,
  result,
  resultHtml,
  cancel,
  contexts,
  reset,
  toggleHistory,
} = useAi(props.tool);
function submit(data: any) {
  send(data);
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
