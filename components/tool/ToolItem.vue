<script lang="ts" setup>
defineProps<{
  icon?: string;
  name?: string;
  desc?: string;
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
      transition-all
      text-xl
      :class="icon"
      class="group-hover:color-primary"
      text-gray-800
      dark:text-gray-200
      mb-2
    ></div>
    <div text-2xl font-semibold text-gray-900 dark:text-gray-100>
      {{ name }}
    </div>
    <div font-medium text-gray-500 dark:text-gray-400>{{ desc }}</div>
  </div>
</template>
