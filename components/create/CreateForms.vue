<script lang="ts" setup>
const { step, maxStep, nextStep, prevStep, tool, isCreate } = useCreateTool();
const { create, remove, update } = useLocalTools();
const localePath = useLocalePath();
const handleSave = () => {
  navigateTo({
    path: localePath(`/ai-${tool.value.id}`),
    replace: true,
  });
  if (isCreate.value) {
    create(tool.value);
    ElMessage.success("Create Success");
  } else {
    update(tool.value);
    ElMessage.success("Update Success");
  }
};
</script>
<template>
  <div relative>
    <h2 text-xl>
      {{ isCreate ? "Create" : "Update" }} Settings ({{ step + 1 }}/{{
        maxStep
      }})
    </h2>
    <CreateTheInfo v-if="step === 0" />
    <CreateTheForms v-else-if="step === 1" />
    <CreateTheRole v-else-if="step === 2" />
    <el-button :disabled="step === 0" size="default" @click="prevStep">
      Prev
    </el-button>
    <el-button
      v-if="step + 1 === maxStep"
      type="primary"
      size="default"
      @click="handleSave"
    >
      Done
    </el-button>
    <el-button v-else type="primary" size="default" @click="nextStep">
      Next
    </el-button>
  </div>
</template>
