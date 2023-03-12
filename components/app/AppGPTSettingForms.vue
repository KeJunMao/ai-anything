<script lang="ts" setup>
const { storageOptions: options } = useChatGPT();
</script>

<template>
  <el-form size="large" label-position="top">
    <el-form-item label="API Key">
      <el-input v-model="options.apiKey" placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"></el-input>
    </el-form-item>
    <el-form-item label="API Base Url">
      <el-input
        v-model="options.apiBaseUrl"
        placeholder="API Base Url"
      ></el-input>
    </el-form-item>
    <el-form-item label="Model">
      <el-select w-full v-model="options.model">
        <el-option value="gpt-3.5-turbo-0301"></el-option>
        <el-option value="gpt-3.5-turbo"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
