<script lang="ts" setup>
import { marked } from "marked";

const props = defineProps<{
  role: string;
  content: string;
  showTyping?: boolean;
}>();
const resultHtml = computed(() => marked.parse(props.content || "&nbsp;"));
const { data, status } = useSession();
const { copy, copied, isSupported } = useClipboard({
  source: props.content,
});
</script>

<template>
  <div
    class="chat-item"
    flex
    gap-x-2
    :class="role === 'user' ? 'flex-row-reverse' : ''"
  >
    <div>
      <el-avatar class="bg-primary!">
        <Icon
          v-if="role === 'assistant'"
          text-2xl
          name="simple-icons:openai"
        ></Icon>
        <img
          v-else-if="role === 'user' && status === 'authenticated'"
          referrerpolicy="no-referrer"
          :src="data?.user?.image ?? ''"
          :alt="data?.user?.name ?? 'avatar'"
        />
        <Icon
          v-else-if="role === 'user'"
          text-2xl
          name="carbon:user-filled"
        ></Icon>
      </el-avatar>
    </div>
    <Card w-full relative>
      <div text-base prose dark:prose-invert max-w-full>
        <div v-html="resultHtml"></div>
      </div>
      <FadeTransition>
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
      </FadeTransition>
      <el-button
        absolute
        right-2
        bottom-2
        v-if="role === 'assistant' && isSupported && !showTyping"
        @click="copy(content)"
        title="Copy Text"
        text
        size="small"
      >
        <div class="i-carbon-copy mr-1"></div>
        <span v-if="copied">Copied</span>
      </el-button>
    </Card>
  </div>
</template>
