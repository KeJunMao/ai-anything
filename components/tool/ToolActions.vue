<script lang="ts" setup>
import { ToolItem } from "~~/types";
const localePath = useLocalePath();
const { isRemoteTool, isLocalTool, isOwnTool } = useTools();
const props = defineProps<{
  tool: ToolItem;
}>();
const canEdit = computed(
  () => isLocalTool(props.tool.id!) || isOwnTool(props.tool)
);
</script>

<template>
  <div left-0 top--8 w-full flex justify-end gap-1 items-center>
    <ToolRemoteAction v-if="isRemoteTool(tool.id!)" :tool="tool" />
    <ToolLocalAction v-else :tool="tool" />
    <template v-if="canEdit">
      <NuxtLink
        :to="{
          path: localePath('/create'),
          query: {
            id: tool.id,
          },
        }"
      >
        <el-button size="small" text>
          <el-icon class="i-carbon:edit"></el-icon>
        </el-button>
      </NuxtLink>
      <ToolSettingDialog :tool="tool" />
    </template>
  </div>
</template>
