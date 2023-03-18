<script lang="ts" setup>
import { ElScrollbar } from "element-plus";
import { OpenAIMessages } from "~~/types";

const props = defineProps<{
  contexts: OpenAIMessages;
  result: string;
  loading: boolean;
}>();
const history = computed(() =>
  props.contexts.filter((v) => v.role !== "system")
);

const scrollbar = ref<InstanceType<typeof ElScrollbar> | null>();
const innerRef = ref<HTMLDivElement>();

watch(
  () => props.result,
  () => {
    nextTick(() => {
      scrollbar.value?.setScrollTop(innerRef.value!.clientHeight);
    });
  }
);
</script>

<template>
  <el-scrollbar ref="scrollbar" height="40vh" mb-8>
    <div ref="innerRef" flex flex-col gap-y-6 px-4>
      <el-empty v-if="!history.length" description="No chat data">
        <template #image>
          <el-icon
            class="text-6xl! color-[var(--el-text-color-secondary)]! i-carbon:not-sent-filled"
          ></el-icon>
        </template>
      </el-empty>
      <ToolChatItem v-for="item in history" v-bind="item"></ToolChatItem>
      <ToolChatItem
        v-if="loading"
        show-typing
        role="assistant"
        :content="result"
      ></ToolChatItem>
    </div>
  </el-scrollbar>
</template>
