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
      <div
        v-if="colorMode.preference === 'dark'"
        class="i-carbon:moon"
      ></div>
      <div
        v-else-if="colorMode.preference === 'light'"
        class="i-carbon:color-switch"
      ></div>
      <div v-else class="i-carbon:sun"></div>
    </ColorScheme>
  </el-button>
</template>
