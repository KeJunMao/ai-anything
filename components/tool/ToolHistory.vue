<script lang="ts" setup>
import { HistoryItem } from "~~/composables/useHistory";
import { ToolItem } from "~~/types";

const props = defineProps<{
  tool: ToolItem;
}>();
const emits = defineEmits(["click-history"]);
const { history, currentHistoryId, remove, update } = useHistory(props.tool);
function handleClickHistory(item: HistoryItem) {
  emits("click-history", item);
}
function handleUpdateName(id: string, name: string) {
  update({
    id,
    name,
  });
}
</script>

<template>
  <el-scrollbar height="calc(100vh - 125px)">
    <div p-4 sm:p-y-10>
      <h2 font-bold>
        {{ tool.name }}
      </h2>
      <p text-gray-500 dark:text-gray-400>{{ tool.desc }}</p>
    </div>
    <el-empty description="No History" v-if="!history.length">
      <template #image>
        <div
          mx-auto
          class="i-carbon:time color-light-500 dark:color-dark-500 text-8xl"
        ></div>
      </template>
    </el-empty>

    <div flex gap-2 flex-col>
      <div v-for="item in history" px-4>
        <tool-history-item
          @change="handleClickHistory(item)"
          @remove="remove(item.id)"
          @update="handleUpdateName(item.id, $event)"
          :active="item.id === currentHistoryId"
          :id="item.id"
          :name="item.name"
          :context="item.context"
        />
      </div>
    </div>
  </el-scrollbar>
</template>
