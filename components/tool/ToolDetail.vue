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
  error,
  resend,
} = useAi(props.tool);

function submit(data: any) {
  if (error.value) {
    resend();
  } else {
    send(data);
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
  <div
    class="[--scroll-y-offset:125px] [--scroll-x-offset:0px] md:[--scroll-x-offset:300px]"
    flex
    flex-col
    style="
      height: calc(100vh - var(--scroll-y-offset));
      width: calc(100vw - var(--scroll-x-offset));
    "
  >
    <el-scrollbar height="100%">
      <div p-4 sm:p-10>
        <ToolResult
          v-if="!tool.chat"
          :html="resultHtml"
          :loading="loading"
          :result="result"
          :contexts="contexts"
          :tool="tool"
        />
        <ToolChatResult
          v-else
          :contexts="contexts"
          :result="result"
          :loading="loading"
          :error="error"
          :tool="tool"
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
        :error="error"
      />
    </div>
  </div>
</template>
