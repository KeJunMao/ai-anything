<script lang="ts" setup>
import { initializeTools } from "./composables/useTools";
await initializeTools();
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
    <VitePwaManifest />
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <NuxtLayout :key="$route.fullPath">
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </AppLayout>
</template>
