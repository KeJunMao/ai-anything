<script lang="ts" setup>
const { storageOptions: options } = useChatGPT();
const models = [
  "gpt-4",
  "gpt-4-0314",
  "gpt-4-32k",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0301",
];
</script>

<template>
  <el-form size="large" label-position="top">
    <el-form-item label="API Key">
      <el-input
        v-model="options.apiKey"
        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      ></el-input>
    </el-form-item>
    <el-form-item label="API Base Url">
      <el-input
        v-model="options.apiBaseUrl"
        placeholder="API Base Url"
      ></el-input>
    </el-form-item>
    <el-form-item label="Model">
      <el-select w-full v-model="options.model">
        <el-option v-for="item in models" :value="item"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
