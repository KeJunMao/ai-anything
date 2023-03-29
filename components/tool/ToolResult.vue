<script lang="ts" setup>
import { OpenAIMessages, ToolItem } from "~~/types";
const props = defineProps<{
  html: string;
  result: string;
  loading: boolean;
  contexts: OpenAIMessages;
  tool: ToolItem;
}>();
const { copy, copied, isSupported } = useClipboard({
  source: props.result,
});
function handleDownload() {
  downloadJson(props.tool.name, props.contexts);
}
</script>

<template>
  <div class="group" text-base w-full>
    <div prose dark:prose-invert max-w-full>
      <div v-html="html"></div>
      <FadeTransition>
        <div v-show="loading" text-sm text-gray mt-2>OpenAI is typing...</div>
      </FadeTransition>
    </div>
    <div
      v-if="!loading && html"
      class="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <el-button-group size="small">
        <el-button @click="copy(result)" v-if="isSupported" title="Copy Text">
          <div class="i-carbon-copy mr-1"></div>
          <span v-if="copied">Copied</span>
        </el-button>
        <el-button @click="handleDownload" title="Download Raw JSON">
          <div class="i-carbon-download"></div>
        </el-button>
      </el-button-group>
    </div>
  </div>
  <el-empty v-if="!html && !loading">
    <template #image>
      <div
        mx-auto
        class="i-carbon:face-wink-filled color-light-500 dark:color-dark-500 text-8xl"
      ></div>
    </template>
  </el-empty>
</template>
