<template>
  <ToolPageLayout>
    <template #default><slot /></template>
    <template #left>
      <slot name="history" />
    </template>
  </ToolPageLayout>
</template>
