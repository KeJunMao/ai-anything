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
  <ABtn variant="text" color="inherit" aria-label="Color Mode" @click="onClick">
    <ColorScheme placeholder="...">
      <div
        v-if="colorMode.preference === 'dark'"
        class="i-mdi:moon-waxing-crescent"
      ></div>
      <div
        v-else-if="colorMode.preference === 'light'"
        class="i-mdi:white-balance-sunny"
      ></div>
      <div v-else class="i-mdi:sun-angle"></div>
    </ColorScheme>
  </ABtn>
</template>
