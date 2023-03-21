<script setup lang="ts">
const route = useRoute();
const toolId = computed(() => route.params.id as string);
let { tool } = useTool(toolId);
</script>

<template>
  <el-header
    grid
    gap-2
    grid-cols-12
    border-b
    class="dark:border-b-[var(--el-border-color)]"
  >
    <div flex items-center col-span-4>
      <AppHeaderLogo flex items-center>
        <FadeTransition>
          <div flex items-center v-if="toolId && tool?.icon">
            <div
              class="i-carbon:favorite-filled color-red mx-2 text-1rem"
            ></div>
            <div w-8 h-8 text-7 flex items-center justify-center of-hidden>
              <ToolIcon color-primary :icon="tool.icon" />
            </div>
          </div>
        </FadeTransition>
      </AppHeaderLogo>
    </div>
    <div flex flex-1 items-center col-span-3 justify-center>
      <AppHeaderNavigation />
    </div>
    <div flex gap-1 sm:gap-2 items-center col-span-5 justify-end>
      <AppSettings />
      <AppAccount />
    </div>
  </el-header>
</template>
