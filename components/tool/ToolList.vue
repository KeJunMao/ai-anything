<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <div>
    <div
      mt-8
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-6
    >
      <NuxtLink :to="localePath('create')">
        <ToolItem
          name="Create"
          desc="Make you own GPT tool"
          icon="i-carbon:add-filled"
        />
      </NuxtLink>
    </div>
  </div>
</template>
