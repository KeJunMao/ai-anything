<script lang="ts" setup>
const { locale, locales, setLocale, localeProperties } = useI18n();

const availableLocales = computed(() => {
  // @ts-ignore
  return locales.value.filter((i) => i.code !== locale.value);
});
function handleCommand(code: string) {
  setLocale(code);
}
</script>
<template>
  <el-dropdown @command="handleCommand">
    <el-button text>
      <el-icon class="i-carbon:language mr-1"></el-icon>
      {{ localeProperties.name }}
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :command="item.code"
          v-for="item in availableLocales"
          :key="item.code"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
