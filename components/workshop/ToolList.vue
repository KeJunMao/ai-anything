<script lang="ts" setup>
const localePath = useLocalePath();
const { search } = useQuerySearch();
const pageSize = ref(20);
const currentPage = ref(0);
const list = ref<any[]>([]);
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
    watch: [search, currentPage, pageSize],
    immediate: false,
  }
);

watch(search, () => {
  list.value = [];
  currentPage.value = 1;
});

watch(data, () => {
  if (data.value?.list) {
    list.value = [...list.value, ...data.value?.list];
  }
});

const el = ref<Window | null>();

onMounted(() => {
  el.value = window;
});

useInfiniteScroll(
  el,
  async () => {
    if (data.value?.total === list.value.length) {
      return;
    }

    currentPage.value++;
  },
  { distance: 10 }
);
currentPage.value++;
</script>

<template>
  <div v-loading="pending">
    <div>
      <div
        mt-8
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        gap-4
        sm:gap-6
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
          : $t('tool.list.empty.description.no-search-tool', [search])
      "
    ></el-empty>
  </div>
</template>
