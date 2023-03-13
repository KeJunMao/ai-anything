<script lang="ts" setup>
const show = ref(false);
const { storageOptions } = useChatGPT();
</script>
<template>
  <div>
    <el-button
      v-if="!storageOptions.apiKey"
      plain
      type="danger"
      @click="show = true"
    >
      <el-icon class="i-carbon:settings"></el-icon>
      <span hidden sm:block ml-1>Please set the API key first</span>
    </el-button>
    <el-button v-else text @click="show = true">
      <el-icon class="i-carbon:settings"></el-icon>
    </el-button>
    <ClientOnly>
      <el-dialog
        v-model="show"
        align-center
        width="auto"
        class="max-w-2xl w-full! h-screen sm:h-auto"
        lock-scroll
        title="App Settings"
        append-to-body
      >
        <AppGPTSettingForms />
      </el-dialog>
    </ClientOnly>
  </div>
</template>
