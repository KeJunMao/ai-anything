<script setup lang="ts">
const colorMode = useColorMode();
const onClick = () => {
  const values = ["system", "light", "dark"];
  const index = values.indexOf(colorMode.preference);
  const next = (index + 1) % values.length;
  colorMode.preference = values[next];
};
</script>

<template>
  <el-button text @click="onClick">
    <ColorScheme placeholder="...">
      <template v-if="colorMode.preference === 'dark'">
        <el-icon class="i-carbon:moon mr-1"></el-icon>
        {{ $t("app.theme-select.dark") }}
      </template>
      <template v-else-if="colorMode.preference === 'light'">
        <el-icon class="i-carbon:sun mr-1"></el-icon>
        {{ $t("app.theme-select.light") }}
      </template>
      <template v-else>
        <el-icon class="i-app:color-mode mr-1"></el-icon>
        {{ $t("app.theme-select.system") }}
      </template>
    </ColorScheme>
  </el-button>
</template>
