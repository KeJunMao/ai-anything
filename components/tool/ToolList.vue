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
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-6
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
        (tools.length === 0
          ? 'Please create the tool first'
          : `No '${search}' results found`) + ', or'
      "
    >
      <NuxtLink :to="localePath('/workshop')">
        <el-button type="primary">Explore</el-button>
      </NuxtLink>
    </el-empty>
  </div>
</template>
