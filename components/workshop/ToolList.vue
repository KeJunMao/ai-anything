<script lang="ts" setup>
const localePath = useLocalePath();
const { search } = useQuerySearch();
const pageSize = ref(9);
const currentPage = ref(1);
const { data, pending } = useAsyncData(
  () =>
    $fetch("/api/tool/all", {
      params: {
        pageSize: pageSize.value,
        currentPage: currentPage.value,
        keyword: search.value,
      },
    }),
  {
    watch: [search, pageSize, currentPage],
  }
);
const total = computed(() => data.value?.total ?? 0);
const list = computed(() => data.value?.list ?? []);
</script>

<template>
  <div v-loading="pending">
    <div min-h-120>
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
          v-for="item in list"
          :key="item.id"
          :to="localePath(`/ai-${item.id}`)"
        >
          <ToolItem h-full :tool="item" />
        </NuxtLink>
      </div>
    </div>

    <el-empty
      v-if="!list?.length"
      :description="
        search === ''
          ? 'There is nothing here :)'
          : `No '${search}' results found`
      "
    ></el-empty>
    <el-pagination
      hide-on-single-page
      justify-center
      background
      layout="prev, pager, next"
      v-model:page-size="pageSize"
      v-model:current-page="currentPage"
      :total="total"
    />
  </div>
</template>
