<script lang="ts" setup>
const { signIn, status, data, signOut } = useSession();
const { clearRemoteCache } = useLocalTools();
async function handleSignOut() {
  clearRemoteCache();
  await signOut();
}
</script>

<template>
  <div>
    <el-button v-if="status === 'unauthenticated'" text @click="() => signIn()">
      <div class="i-carbon:user-avatar-filled"></div>
    </el-button>
    <el-dropdown v-else-if="status === 'authenticated'">
      <el-avatar :size="32" :src="data?.user?.image ?? ''">
        {{ data?.user?.name }}
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleSignOut">Sign Out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
