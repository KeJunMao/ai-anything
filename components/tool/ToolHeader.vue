<script lang="ts" setup>
import { ToolItem } from "~~/types";

defineProps<{
  tool: ToolItem;
}>();
</script>
<template>
  <div flex flex-col items-center text-center mb-4xl>
    <div v-if="tool?.icon" text-6xl color-primary my-2 sm:my-6>
      <ToolIcon :icon="tool.icon" />
    </div>
    <div text-2xl font-semibold text-gray-900 dark:text-gray-100>
      {{ tool?.name }}
    </div>
    <div v-if="tool?.desc" mt-1 font-medium text-gray-500 dark:text-gray-400>
      {{ tool?.desc }}
    </div>
  </div>
</template>
