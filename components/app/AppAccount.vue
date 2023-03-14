<script lang="ts" setup>
const { signIn, status, data } = useSession();
</script>

<template>
  <div>
    <el-button v-if="status === 'unauthenticated'" text @click="() => signIn()">
      <el-icon class="i-carbon:user"></el-icon>
    </el-button>
    <el-avatar
      v-else-if="status === 'authenticated'"
      :size="32"
      :src="data?.user?.image ?? ''"
    >
      {{ data?.user?.name }}
    </el-avatar>
  </div>
</template>
