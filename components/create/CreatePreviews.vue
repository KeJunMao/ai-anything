<script lang="ts" setup>
const { tool, step } = useCreateTool();
</script>
<template>
  <div w-full h-full flex flex-1 flex-col>
    <h2 text-xl mb-2>{{ $t("create.previews.title") }}</h2>
    <div flex-1 flex items-center justify-center>
      <CreatePreviewTransition name="remove" mode="out-in">
        <ToolItem max-w-65 flex-1 v-if="step === 0" :tool="tool" />
        <Card max-w-2xl flex-1 v-else-if="step === 1">
          <ToolForms readonly :tool="tool" />
        </Card>
        <div v-else-if="step === 2" w-full>
          <ToolHeader :tool="tool" />
          <Card>
            <ToolForms :tool="tool" />
            <ToolRequestPreview :tool="tool" />
          </Card>
        </div>
      </CreatePreviewTransition>
    </div>
  </div>
</template>
