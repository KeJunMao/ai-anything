<script lang="ts" setup>
const head = useLocaleHead({ addSeoAttributes: true });
</script>

<template>
  <div
    bg-white
    dark:bg-black
    text-black
    dark:text-white
    flex
    flex-col
    min-h-screen
  >
    <Html :lang="head?.htmlAttrs?.lang">
      <AppHeader />
      <div flex-1>
        <slot />
      </div>
      <AppFooter />
      <AppCommand />
    </Html>
  </div>
</template>
