<script lang="ts" setup>
const { step, maxStep, nextStep, prevStep, tool, isCreate, formEl } =
  useCreateTool();
const { create, createOrUpdate } = useLocalTools();
const localePath = useLocalePath();
const handleSave = () => {
  formEl.value?.validate((isValid) => {
    if (isValid) {
      navigateTo({
        path: localePath(`/ai-${tool.value.id}`),
        replace: true,
      });
      if (isCreate.value) {
        create(tool.value);
        ElMessage.success("Create Success");
      } else {
        createOrUpdate(tool.value);
        ElMessage.success("Update Success");
      }
    }
  });
};
</script>
<template>
  <div relative>
    <h2 text-xl>
      <template v-if="isCreate">
        {{ $t("create.forms.create-title") }}
      </template>
      <template v-else> {{ $t("create.forms.update-title") }} </template>
      ({{ step + 1 }}/{{ maxStep }})
    </h2>
    <CreateTheInfo v-if="step === 0" />
    <CreateTheForms v-else-if="step === 1" />
    <CreateTheRole v-else-if="step === 2" />
    <el-button :disabled="step === 0" size="default" @click="prevStep">
      {{ $t("create.forms.prev") }}
    </el-button>
    <el-button
      v-if="step + 1 === maxStep"
      type="primary"
      size="default"
      @click="handleSave"
    >
      {{ $t("create.forms.done") }}
    </el-button>
    <el-button v-else type="primary" size="default" @click="nextStep">
      {{ $t("create.forms.next") }}
    </el-button>
  </div>
</template>
