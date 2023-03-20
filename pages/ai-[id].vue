<script lang="ts" setup>
const route = useRoute();
let { tool } = useTool(route.params.id as string);
useHead({
  title: tool.value?.name,
});
useSeoMeta({
  description: tool.value?.desc,
});
</script>
<template>
  <div>
    <template v-if="tool">
      <ClientOnly>
        <ToolDetail :tool="tool" />
      </ClientOnly>
    </template>
  </div>
</template>
