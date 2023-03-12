<script lang="ts" setup>
const route = useRoute();
const { tool } = useTool(route.params.id as string);
</script>
<template>
  <div>
    <template v-if="tool">
      <ToolDetail :tool="tool" />
    </template>
  </div>
</template>
