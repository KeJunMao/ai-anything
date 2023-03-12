<script lang="ts" setup>
import { ToolItem } from "~/composables/useTools";
const localePath = useLocalePath();

defineProps<{
  tool: ToolItem;
  showAction?: boolean;
}>();
const { isCustomTool } = useTools();
</script>
<template>
  <div flex gap-2 mb-4>
    <div
      v-if="tool?.icon"
      w-12
      h-12
      flex
      items-center
      justify-center
      rounded-md
      color-primary
      transition-all
      border
      dark:border-gray-800
    >
      <ToolIcon :icon="tool.icon"/>
    </div>
    <div flex flex-col gap-y-1 flex-1>
      <div font-bold>{{ tool?.name }}</div>
      <div line-clamp-2 text-sm text-gray-500>
        {{ tool?.desc ?? "Nothing in here" }}
      </div>
    </div>
    <div v-if="showAction && isCustomTool(tool.id!)" flex gap-1>
      <ToolSettingDialog :tool="tool" />
      <NuxtLink
        :to="{
          path: localePath('/create'),
          query: {
            id: tool.id,
          },
        }"
      >
        <el-button text>
          <el-icon class="i-carbon:edit"></el-icon>
        </el-button>
      </NuxtLink>
    </div>
  </div>
</template>
