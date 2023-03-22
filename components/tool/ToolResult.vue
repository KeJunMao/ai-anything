<script lang="ts" setup>
defineProps<{
  html: string;
  loading: boolean;
}>();
</script>

<template>
  <div text-base w-full>
    <div prose dark:prose-invert max-w-full>
      <div v-html="html"></div>
      <FadeTransition>
        <div v-show="loading" text-sm text-gray mt-2>OpenAI is typing...</div>
      </FadeTransition>
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
