<script lang="ts" setup>
const { search } = useQuerySearch();
</script>

<template>
  <div>
    <el-input
      class="w-full sm:max-w-sm"
      v-model="search"
      type="search"
      :placeholder="$t('workshop.search.placeholder')"
    >
      <template #prefix>
        <el-icon class="i-carbon:search"></el-icon>
      </template>
    </el-input>
  </div>
</template>
