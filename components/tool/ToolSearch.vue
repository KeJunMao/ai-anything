<script lang="ts" setup>
const { search } = useQuerySearch();
const localePath = useLocalePath();
</script>

<template>
  <div flex flex-col justify-between gap-3 sm:flex-row sm:items-center>
    <el-input
      class="w-full sm:max-w-sm"
      v-model="search"
      type="search"
      placeholder="Search Tool"
    >
    </el-input>
    <div flex items-center>
      <div hidden sm:block mr-2 class="animate-bounce-x" text-2xl>👉🏻</div>
      <nuxt-link :to="localePath('/create')" w-full>
        <el-button type="primary" w-full>
          <el-icon class="i-carbon:add-filled mr-1"></el-icon>
          Create
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
