<script lang="ts" setup>
definePageMeta({
  layout: false,
});
const { t } = useI18n();
useHead({
  title: t("tool.search.create"),
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
