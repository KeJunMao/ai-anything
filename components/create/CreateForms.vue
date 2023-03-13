<script lang="ts" setup>
const { step, maxStep, nextStep, prevStep, tool, isCreate } = useCreateTool();
const { save, remove } = useCustomTools();
const localePath = useLocalePath();
const handleSave = async () => {
  await save(tool.value);
  navigateTo({
    path: localePath(`/ai-${tool.value.id}`),
    replace: true,
  });
  if (isCreate.value) {
    ElMessage.success("Create Success");
  } else {
    ElMessage.success("Update Success");
  }
};
const handleRemove = async () => {
  await remove(tool.value.id!);
  navigateTo({
    path: localePath("/"),
    replace: true,
  });
  ElMessage.success("Delete Success");
};
</script>
<template>
  <div relative>
    <h2 text-xl flex justify-between>
      <div>
        {{ isCreate ? "Create" : "Update" }} Settings ({{ step + 1 }}/{{
          maxStep
        }})
      </div>
      <ClientOnly>
        <el-popconfirm
          v-if="!isCreate"
          @confirm="handleRemove"
          title="Are you sure to delete this?"
        >
          <template #reference>
            <el-button type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </ClientOnly>
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
