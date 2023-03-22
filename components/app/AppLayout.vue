<script lang="ts" setup>
const head = useLocaleHead({ addSeoAttributes: true });
const lightThemeColor = "#ffffff";
const darkThemeColor = "#000000";
const colorMode = useColorMode();
useHead(() => ({
  meta: [
    {
      name: "theme-color",
      content: colorMode.value === "dark" ? darkThemeColor : lightThemeColor,
    },
  ],
}));
</script>

<template>
  <div
    bg-white
    dark:bg-black
    text-black
    dark:text-white
    flex
    flex-col
    min-h-screen
  >
    <Html :lang="head?.htmlAttrs?.lang">
      <AppHeader />
      <div flex-1>
        <slot />
      </div>
      <AppFooter />
      <AppCommand />
    </Html>
  </div>
</template>
