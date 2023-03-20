<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
const { tool, formEl } = useCreateTool();

const rules = reactive(
  defineRules({
    template: [
      {
        required: true,
        trigger: "blur",
        message: "Template is required",
      },
    ],
    chat: [
      {
        validator(_rule, value, cb) {
          if (
            value &&
            tool.value.roles[tool.value.roles.length - 1].type !== "user"
          ) {
            cb(
              "When chat mode is enabled, the last conversation must be is user."
            );
          }
          cb();
        },
        trigger: "change",
      },
    ],
  })
);

const roleOptions = [
  {
    value: "system",
    name: "System",
  },
  {
    value: "user",
    name: "User",
  },
  {
    value: "assistant",
    name: "Assistant",
  },
];
function insertRole(index: number) {
  tool.value.roles?.splice(index + 1, 0, {
    id: uuidv4(),
    template: "",
    type: "user",
  });
}
function removeRole(index: number) {
  tool.value.roles?.splice(index, 1);
}

function appendVariable(index: number, _var: string) {
  if (tool.value.roles) {
    tool.value.roles[index].template += `\$\{${_var}\}`;
  }
}

const messageOrderWarning = computed(() => {
  const roles = tool.value.roles;
  const firstSystem = roles.find((v) => v.type === "system");
  if (firstSystem && firstSystem !== roles[0]) {
    return "Typically, a conversation is formatted with a system message first.";
  } else if (
    roles.length > 1 &&
    roles.some((role, index, arr) => arr[index - 1]?.type === role.type)
  ) {
    return "Typically, a conversation is alternating user and assistant messages.";
  } else if (roles[roles.length - 1].type !== "user") {
    return "Typically, the last conversation is user.";
  }
});
</script>

<template>
  <h3 mb-2 text text-gray>{{ $t("create.the-role.title") }}</h3>

  <div pb-4 v-if="messageOrderWarning">
    <el-alert
      :title="messageOrderWarning"
      :closable="false"
      type="warning"
      show-icon
    />
  </div>
  <CreateListTransition name="list">
    <el-form :model="tool.roles" ref="formEl" label-position="top" size="large">
      <div v-for="(item, index) in tool.roles" :key="item.id">
        <el-form-item :prop="`${index}.type`">
          <template #label>
            <div w-full flex items-center justify-between>
              <div>{{ $t("create.the-role.role.label") }}</div>
              <div>
                <el-button
                  @click="insertRole(index)"
                  round
                  size="small"
                  type="primary"
                >
                  <el-icon class="i-carbon:add-alt mr-1"></el-icon>
                  {{ $t("create.the-forms.form.insert") }}
                </el-button>
                <el-button
                  @click="removeRole(index)"
                  :disabled="tool.roles?.length === 1"
                  round
                  size="small"
                  type="danger"
                >
                  <el-icon class="i-carbon:subtract-alt mr-1"></el-icon>
                  {{ $t("create.the-forms.form.delete") }}
                </el-button>
              </div>
            </div>
          </template>
          <el-select w-full v-model="item.type">
            <el-option
              v-for="opt in roleOptions"
              :key="opt.value"
              :value="opt.value"
              :label="opt.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('create.the-role.template.label')"
          :prop="`${index}.template`"
          :rules="rules.template"
        >
          <div flex items-center>
            <div text-12px>{{ $t("create.the-role.template.variable") }}:</div>
            <el-tag
              v-for="item in tool.forms"
              :key="item.name"
              size="small"
              class="ml-2 cursor-pointer"
              type="info"
              @click="appendVariable(index, item.name)"
            >
              {{ item.name }}
            </el-tag>
          </div>
          <el-input
            :placeholder="$t('create.the-role.template.placeholder')"
            type="textarea"
            v-model="item.template"
            :autosize="{ minRows: 3 }"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </CreateListTransition>
  <el-form :model="tool" label-position="top">
    <el-form-item
      prop="chat"
      :label="$t('create.the-role.chat.label')"
      :rules="rules.chat"
    >
      <el-switch v-model="tool.chat" />
    </el-form-item>
  </el-form>
</template>
