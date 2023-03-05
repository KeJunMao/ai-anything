<script lang="ts" setup>
import { Tool } from "~/composables/useTools";

defineProps<{
  tool: Tool;
}>();
</script>

<template>
  <div flex gap-4>
    <div
      w-12
      h-12
      flex
      items-center
      justify-center
      border="~ a-border"
      rounded-md
      color-primary
      text-2xl
    >
      <div :class="tool.icon"></div>
    </div>
    <div flex flex-col gap-y-1 flex-1>
      <div font-bold>{{ tool.title ?? tool.name }}</div>
      <div line-clamp-2 text-sm text-gray-500>{{ tool.desc ?? "Nothing in here" }}</div>
    </div>
  </div>
</template>
