<script lang="ts" setup>
import { ToolItem } from "~~/types";

defineProps<{
  tool: ToolItem;
}>();
</script>

<template>
  <div
    rounded
    flex
    flex-col
    bg-whtie
    dark:bg-black
    border
    items-center
    min-h-24
    transition-all
    hover:bg-light-100
    hover:dark:bg-dark-900
    hover:border-primary
    class="group border-[var(--el-border-color)]"
  >
    <div
      m-5
      w-16
      h-16
      rounded
      text-4xl
      bg-light-300
      dark:bg-dark-700
      flex
      items-center
      justify-center
      class="group-hover:color-primary"
      of-hidden
    >
      <ToolIcon :icon="tool.icon || 'i-simple-icons:openai'" />
    </div>
    <div py-4 px-6 mt-2 w-full text-center>
      <h2 font-bold>
        {{ tool.name }}
      </h2>
      <p
        v-if="tool.desc"
        text-sm
        mt-1
        text-gray-500
        dark:text-gray-400
        line-clamp-3
      >
        {{ tool.desc }}
      </p>
    </div>
  </div>
</template>
