<script lang="ts" setup>
const { signIn, status, data, signOut } = useSession();
const { clearRemoteCache } = useLocalTools();
async function handleSignOut() {
  clearRemoteCache();
  await signOut();
}
async function handleSignIn() {
  signIn();
}
</script>

<template>
  <div>
    <el-button v-if="status === 'unauthenticated'" text @click="handleSignIn">
      <div class="i-carbon:user-avatar-filled"></div>
    </el-button>
    <el-dropdown v-else-if="status === 'authenticated'">
      <el-avatar :size="32">
        <img
          w-32px
          h-32px
          referrerpolicy="no-referrer"
          :src="data?.user?.image ?? ''"
          :alt="data?.user?.name ?? 'avatar'"
        />
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleSignOut">{{
            $t("app.account.sign-out")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
