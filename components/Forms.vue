<script lang="ts" setup>
import type { FormItem } from "~~/data/types";

const props = defineProps<{
  forms: Record<string, FormItem>;
}>();
const data = reactive(
  Object.keys(props.forms).reduce((pre, cur) => {
    const formItem = props.forms[cur];
    pre[cur] = formItem.default ?? "";
    if (formItem.type === "AInput") {
    }
    return pre;
  }, {} as Record<string, any>)
);

defineExpose({
  data,
});
</script>

<template>
  <div flex flex-col gap-y-4 v-for="(item, name) in forms" :key="name">
    <component :is="item.type" v-model="data[name]" v-bind="item.props" />
  </div>
</template>
