<script lang="ts" setup>
import { ToolItem } from "~~/types";
const localePath = useLocalePath();

const { status } = useSession();

const { remove, create: localCreate } = useLocalTools();
const { create } = useRemoteTools();
const loading = ref(false);

const props = defineProps<{
  tool: ToolItem;
}>();

const handleRemove = () => {
  remove(props.tool.id!);
  navigateTo({
    path: localePath("/"),
    replace: true,
  });
  ElMessage.success("Delete Success");
};

const handleUpload = async () => {
  loading.value = true;
  const tool = (await create(props.tool)) as ToolItem;

  localCreate(tool);
  navigateTo({
    path: localePath(`/ai-${tool.id}`),
    replace: true,
  });
  remove(props.tool.id!);
  loading.value = false;
  ElMessage.success("Upload Success");
};
</script>

<template>
  <div>
    <el-button @click="handleRemove" type="danger" size="small" text>
      <el-icon class="i-carbon:trash-can mr-1"></el-icon>
      <span hidden sm:inline>Remove from local</span>
    </el-button>
    <el-button
      v-if="status === 'authenticated'"
      :loading="loading"
      class="ml-0!"
      @click="handleUpload"
      type="primary"
      size="small"
      text
    >
      <el-icon class="i-carbon:cloud-upload mr-1"></el-icon>
      <span hidden sm:inline>Upload to workshop</span>
    </el-button>
  </div>
</template>
