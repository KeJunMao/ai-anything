<script lang="ts" setup>
const props = defineProps<{
  icon?: string;
}>();
const iconName = computed(() =>
  props.icon?.startsWith("i-") ? props.icon.slice(2) : ""
);
</script>

<template>
  <template v-if="iconName">
    <Icon transition-all :name="iconName" />
  </template>
  <template v-else>
    {{ icon }}
  </template>
</template>
