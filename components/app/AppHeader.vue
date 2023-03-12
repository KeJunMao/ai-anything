<script setup lang="ts"></script>

<template>
  <el-header grid gap-2 grid-cols-12>
    <div flex items-center col-span-4>
      <AppHeaderLogo hidden lg:block></AppHeaderLogo>
    </div>
    <div flex flex-1 items-center col-span-4 justify-center>
      <AppHeaderLogo block lg:hidden></AppHeaderLogo>
      <AppHeaderNavigation />
    </div>
    <div flex items-center col-span-4 justify-end>
      <AppSettings />
      <AppThemeSelect />
      <AppSocialIcons hidden md:flex />
    </div>
  </el-header>
</template>
