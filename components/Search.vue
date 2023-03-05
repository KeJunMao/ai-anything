<script lang="ts" setup>
const { search } = useToolSearch();
</script>
<template>
  <div w-full md:max-w-sm px-6 md:px-0>
    <AInput v-model="search" class="text-sm" placeholder="Search a AI helper" />
  </div>
</template>
