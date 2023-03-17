<script lang="ts" setup>
const { storageOptions: options } = useChatGPT();
options.value = {
  ...defaultChatGPTOptions,
  ...options.value,
};

const models = [
  "gpt-4",
  "gpt-4-0314",
  "gpt-4-32k",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0301",
];

const defaultAzureApiURLPath = "/openai/deployments";
const defaultAzureapiURL = "https://please-replace-this.openai.azure.com";

watch(
  () => options.value.provider,
  () => {
    if (options.value.provider === "Azure") {
      if (options.value.apiUrlPath === defaultChatGPTOptions.apiUrlPath) {
        options.value.apiUrlPath = defaultAzureApiURLPath;
      }
      if (options.value.apiBaseUrl === defaultChatGPTOptions.apiBaseUrl) {
        options.value.apiBaseUrl = defaultAzureapiURL;
      }
      options.value.model = "gpt-3.5-turbo";
    } else {
      if (options.value.apiUrlPath === defaultAzureApiURLPath) {
        options.value.apiUrlPath = defaultChatGPTOptions.apiUrlPath;
      }
      if (options.value.apiBaseUrl === defaultAzureapiURL) {
        options.value.apiBaseUrl = defaultChatGPTOptions.apiBaseUrl;
      }
    }
  }
);
</script>

<template>
  <el-form size="large" label-position="top">
    <el-form-item :label="$t('app.gpt-setting-forms.api-key')">
      <el-input
        v-model="options.apiKey"
        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      ></el-input>
    </el-form-item>
    <el-form-item :label="$t('app.gpt-setting-forms.default-provider')">
      <el-select v-model="options.provider" w-full>
        <el-option value="OpenAI"></el-option>
        <el-option value="Azure"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('app.gpt-setting-forms.api-url')">
      <el-input
        v-model="options.apiBaseUrl"
        placeholder="https://api.openai.com"
      ></el-input>
    </el-form-item>
    <el-form-item :label="$t('app.gpt-setting-forms.api-url-path')">
      <el-input
        v-model="options.apiUrlPath"
        placeholder="/v1/chat/completions"
      ></el-input>
    </el-form-item>
    <el-form-item :label="$t('app.gpt-setting-forms.model')">
      <el-select
        w-full
        v-model="options.model"
        :disabled="options.provider === 'Azure'"
      >
        <el-option v-for="item in models" :value="item"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
