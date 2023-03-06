<script lang="ts" setup>
import { objectPick } from "@vueuse/core";
import { defaultChatGPTOptions } from "~~/composables/useChatGPT";

const emit = defineEmits(["save", "reset"]);

const { options } = useChatGPT();
const defaultOptions = objectPick(defaultChatGPTOptions, [
  "apiKey",
  "apiBaseUrl",
  "max_tokens",
  "temperature",
  "top_p",
]);

const currentOptions = ref({
  ...objectPick(options.value, [
    "apiKey",
    "apiBaseUrl",
    "max_tokens",
    "temperature",
    "top_p",
  ]),
});

const storageOptions = useLocalStorage("ai-anything:globalChatGPTOptions", {
  ...currentOptions.value,
});

function save() {
  storageOptions.value = { ...currentOptions.value };
  emit("save");
}

function reset() {
  storageOptions.value = { ...defaultOptions };
  currentOptions.value = { ...defaultOptions };
  emit("reset");
}
</script>

<template>
  <div class="a-card-body">
    <div>
      <ATypography title="Global" mb-2></ATypography>
      <AInput
        v-model="currentOptions[name]"
        class="my-2"
        v-for="(item, name) in currentOptions"
        :placeholder="name"
        :label="name"
        :hint="
          item != defaultOptions[name] && defaultOptions[name]
            ? `Default is '${defaultOptions[name]}'`
            : ''
        "
      ></AInput>
    </div>
    <div flex flex-cols gap-2 mt-2>
      <ABtn @click="save" mr-1>Save</ABtn>
      <ABtn @click="reset" color="danger">Reset</ABtn>
    </div>
  </div>
</template>
