<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink
    text-8
    font-bold
    dark:color-gray-100
    hover:color-gray-500
    whitespace-nowrap
    :to="localePath('/')"
  >
    <div class="i-app:logo"></div>
    <slot />
  </NuxtLink>
</template>
