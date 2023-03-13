<script lang="ts" setup>
import { ToolItem } from "~/composables/useTools";
const { status, signIn } = useSession();
const loading = ref(false);
const { save, remove } = useCustomTools();
const localePath = useLocalePath();
const { isRemoteTool, isOwnTool } = useTools();
const props = defineProps<{
  tool: ToolItem;
}>();

async function handleUpload() {
  if (status.value === "authenticated") {
    loading.value = true;
    try {
      const data = await $fetch("/api/tool", {
        method: "post",
        body: props.tool,
      });
      await remove(props.tool.id!);
      await save(data as unknown as ToolItem);
      if (!isRemoteTool(props.tool.id!)) {
        ElMessage.success("Upload WorkShop success!");
      } else {
        ElMessage.success("Update success!");
      }
      navigateTo({
        path: localePath(`/ai-${data.id}`),
        replace: true,
      });
    } catch (error) {
      ElMessage.error(`Upload Error: ${error}`);
    }

    loading.value = false;
  } else {
    signIn();
  }
}
async function handleRemove() {
  await $fetch(`/api/tool/${props.tool.id!}`, {
    method: "delete",
    body: props.tool,
  });
  await remove(props.tool.id!);
  navigateTo({
    path: localePath(`/`),
    replace: true,
  });
  ElMessage.success("Remove success!");
}
</script>

<template>
  <div>
    <el-button
      :loading="loading"
      type="danger"
      size="small"
      text
      @click="handleRemove"
      v-if="isOwnTool(tool)"
    >
      <el-icon class="i-carbon:subtract-alt"></el-icon>
    </el-button>
    <el-button
      class="ml-1!"
      :loading="loading"
      size="small"
      text
      @click="handleUpload"
    >
      <el-icon class="i-carbon:upload"></el-icon>
    </el-button>
  </div>
</template>
