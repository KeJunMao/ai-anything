<script lang="ts" setup>
const { tool, nextStep } = useCreateTool();
</script>

<template>
  <h3 mb-2 text text-gray>The Info</h3>
  <el-form label-position="top" size="large">
    <el-form-item label="Icon">
      <el-input
        placeholder="Please input i-<category>:<name>, emoji or text"
        v-model="tool.icon"
      ></el-input>
    </el-form-item>
    <el-form-item label="Name">
      <el-input
        placeholder="Please input tool name"
        v-model="tool.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="Desc">
      <el-input
        placeholder="Please input tool desc"
        v-model="tool.desc"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
