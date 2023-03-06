<script lang="ts" setup>
import getTools from "~~/tools";

definePageMeta({
  validate(route) {
    const tool = getTools().find((v) => v.name === route.params.name);
    return !!tool;
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
    <ACard>
      <div class="a-card-body" flex flex-col gap-y-4>
        <div flex justify-between>
          <Tool :tool="tool!" mb-4></Tool>
          <ABtn color="inherit" variant="text">
            <div class="i-mdi:edit"></div>
          </ABtn>
        </div>
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
