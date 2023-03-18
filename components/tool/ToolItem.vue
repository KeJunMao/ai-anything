<script lang="ts" setup>
import { ToolItem } from "~~/types";

defineProps<{
  tool: ToolItem;
}>();
</script>

<template>
  <div
    cursor-pointer
    rounded-xl
    border="~ gray-200"
    dark:border-gray-800
    bg-white
    dark:bg-dark-900
    px-16px
    py-20px
    flex
    flex-col
    transition-all
    hover:drop-shadow-lg
    hover:border-transparent
    dark:hover:border-light
    relative
    class="group"
  >
    <div
      v-if="tool?.icon"
      transition-all
      text-xl
      class="group-hover:color-primary"
      text-gray-800
      dark:text-gray-200
      mb-2
    >
      <ToolIcon :icon="tool.icon" />
    </div>
    <div text-2xl font-semibold text-gray-900 dark:text-gray-100>
      {{ tool?.name }}
    </div>
    <div
      v-if="tool?.desc"
      mt-1
      font-medium
      text-gray-500
      dark:text-gray-400
      sm:line-clamp-2
    >
      {{ tool?.desc }}
    </div>
    <el-icon
      v-if="tool.chat"
      class="i-carbon:chat-bot text-5xl! opacity-10 right-1 bottom-1 absolute!"
    ></el-icon>
    <el-icon
      v-else
      class="i-carbon:terminal-3270 text-5xl! opacity-10 right-1 bottom-1 absolute!"
    ></el-icon>
  </div>
</template>
