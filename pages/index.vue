<script lang="ts" setup>
definePageMeta({
  layout: "home",
});
</script>

<template>
  <div max-w-400 mx-auto px-4 py-10>
    <ToolSearch />
    <ClientOnly>
      <ToolList />
    </ClientOnly>
  </div>
</template>
