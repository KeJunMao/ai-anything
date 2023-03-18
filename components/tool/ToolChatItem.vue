<script lang="ts" setup>
import { marked } from "marked";

const props = defineProps<{
  role: string;
  content: string;
  showTyping?: boolean;
}>();
const resultHtml = computed(() => marked.parse(props.content || "..."));
</script>

<template>
  <div>
    <div flex gap-x-2 :class="role === 'user' ? 'flex-row-reverse' : ''">
      <div>
        <el-avatar class="bg-primary!">
          <Icon
            v-if="role === 'assistant'"
            text-2xl
            name="simple-icons:openai"
          ></Icon>
          <Icon
            v-else-if="role === 'user'"
            text-2xl
            name="carbon:user-filled"
          ></Icon>
        </el-avatar>
      </div>
      <Card w-full relative>
        <div text-base prose dark:prose-invert v-html="resultHtml"></div>
        <transition name="fade">
          <div
            v-show="showTyping"
            absolute
            right-2
            bottom-1
            text-sm
            text-gray
            mt-2
          >
            OpenAI is typing...
          </div>
        </transition>
      </Card>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
