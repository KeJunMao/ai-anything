<script lang="ts" setup>
import { marked } from "marked";
import { ToolItem } from "~~/types";

const props = defineProps<{
  tool: ToolItem;
}>();
const { formData } = useToolFormData(props.tool);
const response = computed(() => parseRoles(formData.value!, props.tool.roles));
const html = computed(() =>
  marked.parse(`
\`\`\`json
${JSON.stringify(response.value, null, 4)}
\`\`\`
`)
);
</script>

<template>
  <Card rounded-4px of-auto>
    <div v-html="html"></div>
  </Card>
</template>
