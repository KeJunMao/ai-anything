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
    <el-form-item :label="$t('app.gpt-setting-forms.api-key')">
      <el-input
        v-model="options.apiKey"
        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      ></el-input>
    </el-form-item>
    <el-form-item :label="$t('app.gpt-setting-forms.api-base-url')">
      <el-input
        v-model="options.apiBaseUrl"
        placeholder="https://api.openai.com"
      ></el-input>
    </el-form-item>
    <el-form-item :label="$t('app.gpt-setting-forms.model')">
      <el-select w-full v-model="options.model">
        <el-option v-for="item in models" :value="item"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
