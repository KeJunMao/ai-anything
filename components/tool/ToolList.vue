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
      <ToolItem
        name="Create"
        desc="Make you own GPT tool"
        icon="i-carbon:add-filled"
      />
      <ToolItem
        name="Official agency partners"
        desc="A carefully built network of trusted agencies from all over the world!"
        icon="i-carbon:add-filled"
      />
      <!-- <NuxtLink
        :to="localePath(`/t/${item.name}`)"
        v-for="item in list"
        :key="item.name"
      >
        <Tool :tool="item" />
      </NuxtLink> -->
    </div>
    <!-- <div v-if="!list.length">
      {{ $t("no-results-found-for-search", [search]) }}
    </div> -->
  </div>
</template>
