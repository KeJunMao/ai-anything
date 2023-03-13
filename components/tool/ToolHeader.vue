<script lang="ts" setup>
import { ToolItem } from "~/composables/useTools";
import { v4 as uuidv4 } from "uuid";
const localePath = useLocalePath();

const props = defineProps<{
  tool: ToolItem;
  showAction?: boolean;
}>();
const { isLocalTool } = useTools();
const { save } = useCustomTools();
function handleFork() {
  const id = uuidv4();
  save({
    ...props.tool,
    id,
  });
  navigateTo({
    path: localePath(`/ai-${id}`),
    replace: true,
  });
}
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
      <ToolIcon :icon="tool.icon" />
    </div>
    <div flex flex-col gap-y-1 flex-1>
      <div font-bold>{{ tool?.name }}</div>
      <div line-clamp-2 text-sm text-gray-500>
        {{ tool?.desc ?? "Nothing in here" }}
      </div>
    </div>
    <div flex gap-1>
      <template v-if="showAction && isLocalTool(tool.id!)">
        <ToolRemoteAction :tool="tool" />
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
      <template v-else>
        <el-button @click="handleFork" size="small" text>
          <el-icon class="i-carbon:fork"></el-icon>
        </el-button>
      </template>
    </div>
  </div>
</template>
