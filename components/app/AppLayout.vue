<script setup lang="ts"></script>

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
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
