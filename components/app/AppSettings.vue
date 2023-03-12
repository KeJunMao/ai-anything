<script lang="ts" setup>
const show = ref(false);
</script>
<template>
  <div>
    <el-button text @click="show = true">
      <el-icon class="i-carbon:settings"></el-icon>
    </el-button>
    <ClientOnly>
      <el-dialog v-model="show" title="App Settings">
        <AppGPTSettingForms />
      </el-dialog>
    </ClientOnly>
  </div>
</template>
