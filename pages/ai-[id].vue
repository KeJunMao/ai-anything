<script lang="ts" setup>
import { HistoryItem } from "~~/composables/useHistory";

const route = useRoute();
let { tool } = useTool(route.params.id as string);

useHead({
  title: tool.value?.name,
});
useSeoMeta({
  description: tool.value?.desc,
});
definePageMeta({
  layout: false,
});
const detail = ref();
function toggleHistory(item: HistoryItem) {
  detail.value.toggleHistory(item);
}
</script>
<template>
  <NuxtLayout name="default">
    <template #history>
      <ToolHistory @click-history="toggleHistory" v-if="tool" :tool="tool" />
    </template>
    <div>
      <ToolDetail ref="detail" v-if="tool" :tool="tool" />
    </div>
  </NuxtLayout>
</template>
