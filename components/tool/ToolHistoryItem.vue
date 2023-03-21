<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
const props = defineProps<{
  id: string;
  name: string;
  active?: boolean;
}>();
const emits = defineEmits(["update", "remove", "change"]);
const isEditing = ref(false);
const value = ref(props.name);
const target = ref(null);
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
    flex
    items-center
    cursor-pointer
    rounded
    px-2
    py-1
    class="hover:bg-[var(--el-color-primary-light-9)] group"
    :class="active ? 'color-primary bg-[var(--el-color-primary-light-8)] ' : ''"
    gap-x-1
  >
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
</template>
