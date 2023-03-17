<template>
  <div class="footer" text-gray-500 flex flex-col pt-10>
    <el-divider class="m-0!">
      <div class="i-app:logo"></div>
    </el-divider>
    <div flex-1 flex items-center justify-between px-2 py-4>
      <div flex gap-1>
        <AppThemeSelect />
        <AppLangSwitcher />
      </div>
      <div hidden sm:block>
        Powered by<NuxtLink
          to="https://github.com/KeJunMao"
          target="_blank"
          ml-1
        >
          KeJun
        </NuxtLink>
      </div>
      <div sm:w-50 flex justify-end>
        <AppSocialIcons />
      </div>
    </div>
  </div>
</template>

<style>
.dark .footer .el-divider__text {
  @apply bg-black;
}
</style>
