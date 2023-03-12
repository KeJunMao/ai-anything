<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink
    text-2xl
    font-bold
    color-gray-900
    dark:color-gray-100
    hover:color-gray-500
    whitespace-nowrap
    :to="localePath('/')"
  >
    AI Anything
  </NuxtLink>
</template>
