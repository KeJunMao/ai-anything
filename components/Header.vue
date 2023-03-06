<script lang="ts" setup>
const isSettingsShow = ref(false);
const isLanguageSwitcherShow = ref(false);
const localePath = useLocalePath();
</script>

<template>
  <header h-16 flex items-center container mx-auto px-4 md:px-0>
    <NuxtLink :to="localePath('/')"><Logo /></NuxtLink>
    <Nav flex-1 />
    <div flex flex-cols gap-1 md:gap-4>
      <NuxtLink to="https://github.com/KeJunMao/ai-anything" target="_blank">
        <ABtn color="inherit" variant="text">
          <div class="i-mdi:github"></div>
        </ABtn>
      </NuxtLink>
      <ThemeSelect />
      <ABtn
        @click="isLanguageSwitcherShow = true"
        color="inherit"
        variant="text"
      >
        <div class="i-mdi:translate-variant"></div>
      </ABtn>
      <ABtn @click="isSettingsShow = true" color="inherit" variant="text">
        <div class="i-mdi:cog"></div>
      </ABtn>
    </div>
    <ADialog v-model="isLanguageSwitcherShow">
      <LangSwitcher @change="isLanguageSwitcherShow = false" />
    </ADialog>
    <ADialog v-model="isSettingsShow">
      <ChatGPTSettings @save="isSettingsShow = false" />
    </ADialog>
  </header>
</template>
