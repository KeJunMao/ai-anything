<template>
  <div
    text-gray-500
    flex
    flex-col
    class="footer dark:border-t-[var(--el-border-color)]"
  >
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
