<template>
  <div h-16 text-gray-500 flex flex-col>
    <el-divider class="m-0!">
      <div class="i-app:logo"></div>
    </el-divider>
    <div flex-1 flex items-center justify-between px-2>
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
