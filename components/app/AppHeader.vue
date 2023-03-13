<script setup lang="ts"></script>

<template>
  <el-header grid gap-2 grid-cols-12>
    <div flex items-center col-span-4>
      <AppHeaderLogo></AppHeaderLogo>
    </div>
    <div flex flex-1 items-center col-span-4 justify-center>
      <AppHeaderNavigation />
    </div>
    <div flex items-center col-span-4 justify-end>
      <AppSettings />
      <AppThemeSelect />
      <AppSocialIcons />
    </div>
  </el-header>
</template>
