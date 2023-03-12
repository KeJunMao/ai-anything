<script lang="ts" setup>
const localePath = useLocalePath();
const { tools } = useTools();
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
          h-full
          :tool="{
            id: 'create',
            name: 'Create',
            desc: 'Make you own GPT tool',
            icon: 'i-carbon:add-filled',
            roles: [],
            forms: [],
          }"
        />
      </NuxtLink>
      <NuxtLink
        v-for="item in tools"
        :key="item.id"
        :to="localePath(`/ai-${item.id}`)"
      >
        <ToolItem h-full :tool="item" />
      </NuxtLink>
    </div>
  </div>
</template>
