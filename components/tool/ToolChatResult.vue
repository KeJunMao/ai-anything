<script lang="ts" setup>
import { OpenAIMessages, ToolItem } from "~~/types";

const props = defineProps<{
  contexts: OpenAIMessages;
  result: string;
  loading: boolean;
  error: any;
  tool: ToolItem;
}>();
const history = computed(() =>
  props.contexts.filter((v) => v.role !== "system")
);

const innerRef = ref<HTMLDivElement>();

watch(
  () => props.loading,
  () => {
    nextTick(() => {
      innerRef.value?.querySelector(".chat-item:last-child")?.scrollIntoView();
    });
  }
);

function handleDownload() {
  downloadJson(props.tool.name, props.contexts);
}
</script>

<template>
  <div ref="innerRef" flex flex-col gap-y-6 class="group">
    <el-empty v-if="!history.length">
      <template #image>
        <div
          mx-auto
          class="i-carbon:chat color-light-500 dark:color-dark-500 text-8xl"
        ></div>
      </template>
    </el-empty>
    <ToolChatItem v-for="item in history" v-bind="item"></ToolChatItem>
    <ToolChatItem
      v-if="loading || error"
      show-typing
      role="assistant"
      :content="result"
    ></ToolChatItem>
    <div
      v-if="!loading && history.length"
      class="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <el-button-group size="small">
        <el-button @click="handleDownload" title="Download Raw JSON">
          <div class="i-carbon-download"></div>
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>
