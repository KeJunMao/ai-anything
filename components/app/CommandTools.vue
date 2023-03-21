<script lang="ts" setup>
import { Command } from "vue-command-palette";
const localePath = useLocalePath();
const { tools } = useTools();

const localToolList = computed(() => {
  return tools.value.map((tool) => {
    return {
      ...tool,
      perform: () => {
        navigateTo(localePath(`/ai-${tool.id}`));
      },
    };
  });
});

const emits = defineEmits(["select"]);

function handleSelect(item: typeof localToolList.value[0]) {
  emits("select", item);
  item.perform();
}
</script>

<template>
  <Command.Group heading="Local Tools">
    <Command.Item
      v-for="item in localToolList"
      :key="item.id"
      :data-value="item.name"
      @select="handleSelect(item)"
    >
      <ToolIcon :icon="item.icon" />
      <div>{{ item.name }}</div>
      <div command-linear-shortcuts class="hidden">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <g
            stroke="currentColor"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 3v4c0 2-2 4-4 4H2"></path>
            <path d="M8 17l-6-6 6-6"></path>
          </g>
        </svg>
      </div>
    </Command.Item>
  </Command.Group>
</template>
