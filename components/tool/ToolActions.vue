<script lang="ts" setup>
import { ToolItem } from "~~/types";

const localePath = useLocalePath();

defineProps<{
  tool: ToolItem;
}>();
</script>

<template>
  <div absolute left-0 top--8 w-full h-full flex justify-end gap-1>
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
  </div>
</template>
