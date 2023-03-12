<script lang="ts" setup>
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="create">
    <CreateForms />
    <template #preview>
      <CreatePreviews />
    </template>
  </NuxtLayout>
</template>
