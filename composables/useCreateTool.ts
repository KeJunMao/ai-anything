import { v4 as uuidv4 } from "uuid";
import { ToolItem } from "~~/types";
import { ElForm } from "element-plus";

export const useCreateTool = createSharedComposable(() => {
  const maxStep = ref(3);
  const step = ref(0);
  const formEl = ref<InstanceType<typeof ElForm> | null>();
  const nextStep = () => {
    formEl.value?.validate((isValid) => {
      if (isValid) {
        if (step.value + 1 < maxStep.value) {
          step.value += 1;
        }
      }
    });
  };
  const prevStep = () => {
    if (step.value - 1 >= 0) {
      step.value -= 1;
    }
  };
  const route = useRoute();
  const id = computed(() => route.query.id as string);
  const { tool: oldTool } = useTool(id);
  const tool = ref<ToolItem>({
    id: uuidv4(),
    name: "New GPT Tool",
    icon: "🔨",
    desc: "This is my new GPT tool!",
    forms: [
      {
        id: uuidv4(),
        name: "message",
        type: "ElInput",
        props: {
          placeholder: "Please input message",
          type: "textarea",
        },
      },
    ],
    roles: [
      {
        id: uuidv4(),
        type: "system",
        template: "",
      },
      {
        id: uuidv4(),
        type: "user",
        template: "${message}",
      },
    ],
    author: "",
  });
  const isCreate = computed(() => oldTool.value?.id !== tool.value.id);

  watch(
    oldTool,
    () => {
      if (oldTool.value) {
        tool.value = JSON.parse(JSON.stringify(oldTool.value));
      }
    },
    {
      immediate: true,
    }
  );

  return {
    tool,
    step,
    maxStep,
    nextStep,
    prevStep,
    isCreate,
    formEl,
  };
});
