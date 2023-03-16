<script lang="ts" setup>
const { t } = useI18n();
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t("app.name")}` : t("app.name");
  },
});
useSeoMeta({
  description: t("app.desc"),
});
</script>

<template>
  <AppLayout>
    <NuxtLayout>
      <NuxtLoadingIndicator></NuxtLoadingIndicator>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </AppLayout>
</template>
