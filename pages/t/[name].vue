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
const form = ref();
const { loading, resultHtml, send } = useAi(tool.value?.name!);
const submit = () => {
  send(form.value.data);
};
</script>
<template>
  <div pt-0 md:pt-5 px-4 md:px-0 max-w-2xl w-full m-auto>
    <ATypography mb-5 :title="tool!.title" :subtitle="tool?.desc"></ATypography>
    <ACard>
      <div class="a-card-body" flex flex-col gap-y-4>
        <Forms ref="form" v-if="tool?.forms" :forms="tool?.forms" />
        <ABtn :disabled="loading" w-full @click="submit"> 提交 </ABtn>
      </div>
    </ACard>
    <ACard
      mt-2
      v-show="resultHtml"
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
