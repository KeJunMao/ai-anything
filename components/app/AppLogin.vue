<script lang="ts" setup>
const { status, signIn, data } = useSession();
</script>

<template>
  <el-button v-if="status === 'unauthenticated'" text @click="() => signIn()">
    <el-icon class="i-carbon:user"></el-icon>
  </el-button>
  <el-avatar
    :size="32"
    min-w-32px
    v-if="status === 'authenticated'"
    :src="data?.user?.image ?? ''"
  >
    {{ data?.user?.name }}
  </el-avatar>
</template>
