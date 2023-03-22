<script lang="ts" setup>
definePageMeta({
  layout: "home",
});
const { t } = useI18n();
useHead({
  title: t("tool.search.workshop"),
});
useSeoMeta({
  description: t("workshop.header.desc"),
});
</script>

<template>
  <div max-w-400 mx-auto px-4 py-10>
    <ClientOnly>
      <WorkshopHeader />
    </ClientOnly>
    <WorkshopSearch />
    <WorkshopToolList />
  </div>
</template>
