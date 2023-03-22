<script lang="ts" setup>
const { search } = useQuerySearch();
const localePath = useLocalePath();
</script>

<template>
  <div
    key="tool-search"
    flex
    flex-col
    justify-between
    gap-3
    sm:flex-row
    sm:items-center
  >
    <el-input
      class="w-full sm:max-w-sm"
      v-model="search"
      type="search"
      :placeholder="$t('tool.search.placeholder')"
    >
      <template #prefix>
        <el-icon class="i-carbon:search"></el-icon>
      </template>
      <template #suffix>
        <kbd>⌘</kbd>
        +
        <kbd>K</kbd>
      </template>
    </el-input>
    <div flex items-center gap-2>
      <div hidden sm:block mr-2 class="animate-bounce-x" text-2xl>👉🏻</div>
      <nuxt-link :to="localePath('/create')" w-full>
        <el-button w-full>
          <el-icon class="i-carbon:add-filled mr-1"></el-icon>
          {{ $t("tool.search.create") }}
        </el-button>
      </nuxt-link>
      <nuxt-link :to="localePath('/workshop')" w-full>
        <el-button type="primary" w-full class="color-dark-500!">
          <el-icon class="i-carbon:apps mr-1"></el-icon>
          {{ $t("tool.search.workshop") }}
        </el-button>
      </nuxt-link>
    </div>
  </div>
</template>

<style>
@keyframes bounce-x {
  0%,
  100% {
    transform: translateX(-25%);
    -webkit-animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateX(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.animate-bounce-x {
  animation: bounce-x 1s infinite;
}
</style>
