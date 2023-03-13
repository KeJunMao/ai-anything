<script lang="ts" setup>
const show = ref(false);
</script>
<template>
  <div>
    <el-button text @click="show = true">
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
