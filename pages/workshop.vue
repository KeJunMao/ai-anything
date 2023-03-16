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
  <div max-w-400 mx-auto px-4 mt-10>
    <WorkshopHeader />
    <WorkshopSearch />
    <WorkshopToolList />
  </div>
</template>
