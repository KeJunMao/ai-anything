<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { OpenAIMessages } from "~~/types";
const props = defineProps<{
  id: string;
  name: string;
  active?: boolean;
  context: OpenAIMessages;
}>();
const emits = defineEmits(["update", "remove", "change"]);
const isEditing = ref(false);
const value = ref(props.name);
const target = ref(null);
const description = computed(() => {
  // find last and first contenxt, if role is user
  const first = props.context.find((c) => c.role === "user");
  const last = props.context
    .slice()
    .reverse()
    .find((c) => c.role === "user");

  if (first === last) {
    return first?.content;
  }
  return `${first?.content} ... ${last?.content}`;
});

onClickOutside(target, (event) => {
  isEditing.value = false;
});
function handleRemove() {
  if (!props.active && !isEditing.value) {
    emits("remove");
  }
}
function handleChage() {
  if (!props.active && !isEditing.value) {
    emits("change");
  }
}
watch(value, () => {
  emits("update", value);
});
</script>
<template>
  <div
    @click="handleChage"
    ref="target"
    w-full
    cursor-pointer
    rounded
    px-2
    py-1
    class="hover:bg-[var(--el-color-primary-light-9)] group"
    border="~ gray-200"
    dark:border-gray-800
    :class="active ? 'color-primary bg-[var(--el-color-primary-light-8)] ' : ''"
    gap-x-1
  >
    <div flex items-center>
      <el-input class="flex-1" v-if="isEditing" v-model="value"> </el-input>
      <div v-else flex-1 line-clamp-1>
        {{ name }}
      </div>
      <div opacity-0 group-hover:opacity-100>
        <el-button
          @click="isEditing = !isEditing"
          @click.stop=""
          text
          size="small"
        >
          <el-icon class="i-carbon:edit"></el-icon>
        </el-button>
        <el-button
          :disabled="active"
          @click.stop="handleRemove"
          class="ml-1!"
          text
          size="small"
        >
          <el-icon class="i-carbon:trash-can"></el-icon>
        </el-button>
      </div>
    </div>
    <div text-sm mt-1 text-gray-500 dark:text-gray-400 line-clamp-2>
      {{ description }}
    </div>
  </div>
</template>
