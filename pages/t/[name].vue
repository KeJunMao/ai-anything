<script lang="ts" setup>
import { marked } from "marked";
definePageMeta({
  validate(route) {
    const tool = useTool(route.params.name as string);
    return !!tool.value;
  },
});
const route = useRoute();
const tool = useTool(route.params.name as string);
useHead({
  title: tool.value?.title,
});
const message = ref("");
const result = ref("");
const loading = ref(false);
const resultHtml = computed(() => marked.parse(result.value));
const submit = async () => {
  if (message.value) {
    result.value = "";
    loading.value = true;
    // @ts-expect-error
    const response: ReadableStream = await $fetch("/api/generate", {
      method: "post",
      body: {
        prompt: {
          message: message.value,
        },
        tool: tool.value?.name,
      },
      responseType: "stream",
    });
    const reader = response.getReader();
    const decoder = new TextDecoder();
    let isDone = false;
    while (!isDone) {
      const { value, done } = await reader.read();
      isDone = done;
      const text = decoder.decode(value);
      result.value += text.replace(/\$id:([a-zA-Z0-9\-]+)\$/, "");
    }
    loading.value = false;
  }
};
</script>
<template>
  <div pt-0 md:pt-5 px-4 md:px-0 max-w-2xl w-full m-auto>
    <ATypography mb-5 :title="tool!.title" :subtitle="tool?.desc"></ATypography>
    <ACard>
      <div class="a-card-body" flex flex-col gap-y-4>
        <ATextarea
          v-model="message"
          :placeholder="tool?.placeholder"
        ></ATextarea>
        <ABtn :disabled="loading" w-full @click="submit"> 提交 </ABtn>
      </div>
    </ACard>
    <ACard
      mt-2
      v-if="result"
      variant="outline"
      :color="loading ? 'warning' : 'primary'"
    >
      <div class="a-card-body">
        <div
          text-sm
          prose
          prose-truegray
          dark:prose-invert
          v-html="resultHtml"
        ></div>
      </div>
    </ACard>
  </div>
</template>
