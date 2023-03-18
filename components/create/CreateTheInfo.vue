<script lang="ts" setup>
const { tool, formEl } = useCreateTool();
const rules = reactive(
  defineRules({
    icon: [
      {
        max: 40,
        message: "Icon cannot be longer than 40 characters",
        trigger: "blur",
      },
    ],
    name: [
      {
        max: 40,
        message: "Name cannot be longer than 40 characters",
        trigger: "blur",
      },
      {
        required: true,
        trigger: "blur",
        message: "Name is required",
      },
    ],
    desc: [
      {
        max: 100,
        message: "Desc cannot be longer than 100 characters",
        trigger: "blur",
      },
    ],
  })
);
</script>

<template>
  <h3 mb-2 text text-gray>{{ $t("create.the-info.title") }}</h3>
  <el-form
    :rules="rules"
    :model="tool"
    ref="formEl"
    label-position="top"
    size="large"
  >
    <el-form-item :label="$t('create.the-info.icon.label')" prop="icon">
      <el-input
        :placeholder="$t('create.the-info.icon.placeholder')"
        maxlength="40"
        show-word-limit
        v-model="tool.icon"
      ></el-input>
    </el-form-item>
    <el-form-item :label="$t('create.the-info.name.label')" prop="name">
      <el-input
        :placeholder="$t('create.the-info.name.placeholder')"
        maxlength="40"
        show-word-limit
        v-model="tool.name"
      ></el-input>
    </el-form-item>
    <el-form-item :label="$t('create.the-info.desc.label')" prop="desc">
      <el-input
        :placeholder="$t('create.the-info.desc.placeholder')"
        type="textarea"
        maxlength="100"
        show-word-limit
        v-model="tool.desc"
        :autosize="{ minRows: 3 }"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
