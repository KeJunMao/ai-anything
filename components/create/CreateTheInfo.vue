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
  <h3 mb-2 text text-gray>The Info</h3>
  <el-form
    :rules="rules"
    :model="tool"
    ref="formEl"
    label-position="top"
    size="large"
  >
    <el-form-item label="Icon" prop="icon">
      <el-input
        placeholder="Please input i-<category>:<name>, emoji or text"
        maxlength="40"
        show-word-limit
        v-model="tool.icon"
      ></el-input>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input
        placeholder="Please input tool name"
        maxlength="40"
        show-word-limit
        v-model="tool.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="Desc" prop="desc">
      <el-input
        placeholder="Please input tool desc"
        type="textarea"
        maxlength="100"
        show-word-limit
        v-model="tool.desc"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
