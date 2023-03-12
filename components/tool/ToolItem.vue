<script lang="ts" setup>
import { ToolItem } from "~/composables/useTools";

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
    class="group"
  >
    <div
      v-if="tool?.icon"
      transition-all
      text-xl
      :class="tool?.icon?.startsWith('i') ? tool?.icon : ''"
      class="group-hover:color-primary"
      text-gray-800
      dark:text-gray-200
      mb-2
    >
      <template v-if="!tool?.icon?.startsWith('i')">{{ tool?.icon }}</template>
    </div>
    <div text-2xl font-semibold text-gray-900 dark:text-gray-100>
      {{ tool?.name }}
    </div>
    <div v-if="tool?.desc" mt-1 font-medium text-gray-500 dark:text-gray-400>
      {{ tool?.desc }}
    </div>
  </div>
</template>
