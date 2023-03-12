<script lang="ts" setup>
defineProps<{
  html: string;
}>();
</script>

<template>
  <Card rounded-4px text-base prose dark:prose-invert>
    <div v-html="html"></div>
  </Card>
</template>
