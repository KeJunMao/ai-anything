<script lang="ts" setup>
const show = ref(false);
const { storageOptions } = useChatGPT();
const showWarning = computed(() => !storageOptions.value.apiKey);
</script>
<template>
  <div>
    <ClientOnly>
      <el-button
        :text="!showWarning"
        :plain="showWarning"
        :type="showWarning ? 'danger' : ''"
        @click="show = true"
        aria-label="Settings"
      >
        <el-icon class="i-carbon:settings"></el-icon>
        <span hidden sm:block ml-1 v-if="showWarning">{{
          $t("app.settings.please-set-the-api-key-first")
        }}</span>
      </el-button>
      <el-dialog
        v-model="show"
        align-center
        width="auto"
        class="max-w-2xl w-full! h-screen sm:h-auto"
        lock-scroll
        :title="$t('app.settings.app-settings')"
        append-to-body
      >
        <AppGPTSettingForms />
      </el-dialog>
      <template #fallback>
        <el-button text>
          <el-icon class="i-carbon:settings"></el-icon>
        </el-button>
      </template>
    </ClientOnly>
  </div>
</template>
