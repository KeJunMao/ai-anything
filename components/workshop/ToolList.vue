<script lang="ts" setup>
const localePath = useLocalePath();
const { search } = useQuerySearch();
const { data: tools, pending } = useAsyncData(
  () =>
    $fetch("/api/tool/all", {
      params: {
        pageSize: 10,
        currentPage: 0,
        keyword: search.value,
      },
    }),
  {
    watch: [search],
  }
);
</script>

<template>
  <div v-loading="pending">
    <div
      mt-8
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-6
    >
      <NuxtLink
        v-for="item in tools"
        :key="item.id"
        :to="localePath(`/ai-${item.id}`)"
      >
        <ToolItem h-full :tool="item" />
      </NuxtLink>
    </div>
    <el-empty
      v-if="!tools?.length"
      :description="`No '${search}' results found`"
    ></el-empty>
  </div>
</template>
