<script lang="ts" setup>
const localePath = useLocalePath();

const { tools } = useTools();
const { search } = useToolSearch();
const list = computed(() =>
  tools.value.filter(
    (v) =>
      v.name.includes(search.value) ||
      v.title?.includes(search.value) ||
      v.keywords?.some((k) => k.includes(search.value))
  )
);
</script>

<template>
  <div>
    <div mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-0>
      <NuxtLink
        :to="localePath(`/t/${item.name}`)"
        v-for="item in list"
        :key="item.name"
      >
        <Tool :tool="item" />
      </NuxtLink>
    </div>
    <div v-if="!list.length">
      {{ $t("no-results-found-for-search", [search]) }}
    </div>
  </div>
</template>
