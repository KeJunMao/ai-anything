<script lang="ts" setup>
defineProps<{
  html: string;
}>();
</script>

<template>
  <div text-base w-full>
    <div prose dark:prose-invert max-w-full>
      <div v-html="html"></div>
    </div>
  </div>
  <el-empty v-if="!html">
    <template #image>
      <div
        mx-auto
        class="i-carbon:face-wink-filled color-light-500 dark:color-dark-500 text-8xl"
      ></div>
    </template>
  </el-empty>
</template>
