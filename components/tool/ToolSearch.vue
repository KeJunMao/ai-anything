<script lang="ts" setup>
const { search } = useQuerySearch();
const localePath = useLocalePath();
</script>

<template>
  <div flex flex-col justify-between gap-3 lg:flex-row lg:items-center>
    <el-input
      class="w-full md:max-w-sm"
      v-model="search"
      type="search"
      placeholder="Search Tool"
    >
    </el-input>
    <nuxt-link :to="localePath('/create')">
      <el-button type="primary" w-full>
        <el-icon class="i-carbon:add-filled mr-1"></el-icon>
        Create
      </el-button>
    </nuxt-link>
  </div>
</template>
