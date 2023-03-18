<script lang="ts" setup>
import { ToolItem } from "~~/types";
import { v4 as uuidv4 } from "uuid";
const localePath = useLocalePath();
const { isOwnTool } = useTools();

const {
  remove: localRemove,
  update: localUpdate,
  create: localCreate,
} = useLocalTools();
const { update, remove, refresh } = useRemoteTools();

const loading = ref(false);
const props = defineProps<{
  tool: ToolItem;
}>();

const handleRemove = async () => {
  loading.value = true;
  await remove(props.tool.id!);
  localRemove(props.tool.id!);
  navigateTo({
    path: localePath("/"),
    replace: true,
  });
  ElMessage.success("Delete Success");
  loading.value = false;
  await refresh();
};

const handleUpdate = async () => {
  loading.value = true;
  await update(props.tool);
  localUpdate(props.tool);
  ElMessage.success("Update Success");
  loading.value = false;
};
const handleFork = () => {
  const { author, id, ...body } = props.tool;
  const newId = uuidv4();
  localCreate({
    ...body,
    id: newId,
    author: "",
  });
  navigateTo({
    path: localePath(`/ai-${newId}`),
    replace: true,
  });
  ElMessage.success("Fork Success");
};
</script>

<template>
  <div>
    <template v-if="isOwnTool(tool)">
      <el-button
        :loading="loading"
        @click="handleRemove"
        type="danger"
        size="small"
        text
      >
        <el-icon class="i-carbon:trash-can mr-1"></el-icon>
        <span hidden sm:inline>Remove from workshop</span>
      </el-button>
      <el-button
        :loading="loading"
        class="ml-0!"
        @click="handleUpdate"
        type="primary"
        size="small"
        text
      >
        <el-icon class="i-carbon:cloud-upload mr-1"></el-icon>
        <span hidden sm:inline>Sync to workshop</span>
      </el-button>
    </template>
    <template v-else>
      <el-button
        :loading="loading"
        @click="handleFork"
        type="primary"
        size="small"
        text
      >
        <el-icon class="i-carbon:direction-fork mr-1"></el-icon>
        <span hidden sm:inline>Fork to local</span>
      </el-button>
    </template>
  </div>
</template>
