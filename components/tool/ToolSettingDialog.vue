<script lang="ts" setup>
import { defaultChatGPTOptions } from "~/composables/useChatGPT";
import { objectPick } from "@vueuse/core";
import { ToolItem } from "~~/types";

const props = defineProps<{
  tool: ToolItem;
}>();
const show = ref(false);
const { update } = useLocalTools();

const formData = ref<Record<string, any>>({
  ...objectPick(defaultChatGPTOptions, [
    "temperature",
    "top_p",
    "n",
    "max_tokens",
    "presence_penalty",
    "frequency_penalty",
  ]),
  ...props.tool.options,
});

function handleSave() {
  update({
    ...props.tool,
    options: formData.value,
  });
  show.value = false;
  ElMessage.success("Saved success!");
}
</script>

<template>
  <div>
    <el-button size="small" text @click="show = true">
      <el-icon class="i-carbon:settings"></el-icon>
    </el-button>
    <el-dialog
      v-model="show"
      :title="$t('tool.setting-dialog.title', [tool.name || 'Tool'])"
      align-center
      width="auto"
      class="max-w-2xl w-full! h-screen sm:h-auto sm:max-h-3xl of-auto"
      lock-scroll
      append-to-body
    >
      <el-form label-position="top" size="large">
        <el-form-item v-for="(_, name) in formData" :label="name">
          <el-input v-model.number="formData[name]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSave" type="primary">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
