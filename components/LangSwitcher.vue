<script lang="ts" setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const emit = defineEmits(["change"]);
function change(item: any) {
  emit("change");
  navigateTo(switchLocalePath(item.code));
}
</script>
<template>
  <AList>
    <AListItem
      v-for="item in locales"
      :key="item.code"
      :text="item.name"
      :is-active="locale === item.code"
      @click="change(item)"
    />
  </AList>
</template>
