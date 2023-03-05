<script lang="ts" setup>
import type { Tool } from "~/data/types";

defineProps<{
  tool: Tool;
}>();
</script>

<template>
  <div flex gap-4 class="tool">
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
      class="icon"
      transition-all
    >
      <div :class="tool.icon"></div>
    </div>
    <div flex flex-col gap-y-1 flex-1>
      <div font-bold>{{ tool.title ?? tool.name }}</div>
      <div line-clamp-2 text-sm text-gray-500>
        {{ tool.desc ?? "Nothing in here" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool:hover .icon {
  @apply color-white bg-primary border-transparent;
}
</style>
