<script lang="ts" setup>
const localePath = useLocalePath();
const { tools } = useTools();
const { search } = useQuerySearch();
const searchTools = computed(() =>
  tools.value.filter((v) => v.name?.toLocaleLowerCase()?.includes(search.value))
);
</script>

<template>
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
        v-for="item in searchTools"
        :key="item.id"
        :to="localePath(`/ai-${item.id}`)"
      >
        <ToolItem h-full :tool="item" />
      </NuxtLink>
    </div>
    <el-empty
      v-if="!searchTools.length"
      :description="
        tools.length === 0
          ? $t('tool.list.empty.description.no-tool')
          : $t('tool.list.empty.description.no-search-tool', [search])
      "
    >
      <NuxtLink :to="localePath('/workshop')">
        <el-button type="primary">{{ $t("tool.list.explore") }}</el-button>
      </NuxtLink>
    </el-empty>
  </div>
</template>
