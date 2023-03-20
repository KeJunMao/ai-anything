<script lang="ts" setup>
const props = defineProps<{
  icon?: string;
}>();
const iconName = computed(() =>
  props.icon?.startsWith("i-") ? props.icon.slice(2) : ""
);
</script>

<template>
  <span v-if="iconName">
    <Icon transition-all :name="iconName" />
  </span>
  <span v-else>
    {{ icon }}
  </span>
</template>
