<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";

const { tool, formEl } = useCreateTool();
const formTypes = [
  {
    value: "ElInput",
    name: "Input",
  },
  {
    value: "ElSelect",
    name: "Select",
  },
];
function insertForm(index: number) {
  tool.value.forms?.splice(index + 1, 0, {
    id: uuidv4(),
    props: {},
    name: `message${tool.value.forms.length}`,
    type: "ElInput",
  });
}
function removeForm(index: number) {
  tool.value.forms?.splice(index, 1);
}
function stop(event: MouseEvent) {
  // @ts-ignore
  if (event?.target?.id !== "expand") {
    event.stopPropagation();
  }
}

const rules = reactive(
  defineRules({
    name: [
      {
        max: 20,
        message: "Name cannot be longer than 20 characters",
        trigger: "blur",
      },
      {
        required: true,
        trigger: "blur",
        message: "Name is required",
      },
    ],
    label: [
      {
        max: 20,
        message: "Label cannot be longer than 20 characters",
        trigger: "blur",
      },
    ],
    type: [
      {
        required: true,
        trigger: "change",
        message: "Type is required",
      },
    ],
  })
);

const propsRules = reactive(
  defineRules({
    type: [],
    options: [
      {
        type: "array",
        trigger: "change",
        defaultField: {
          max: 40,
          message: "Option item cannot be longer than 40 characters",
        },
      },
    ],
    placeholder: [
      {
        max: 100,
        message: "Placeholder cannot be longer than 100 characters",
        trigger: "blur",
      },
    ],
    default: [
      {
        max: 100,
        message: "Default cannot be longer than 100 characters",
        trigger: "blur",
      },
    ],
  })
);
</script>

<template>
  <h3 mb-2 text text-gray>The Forms</h3>
  <el-form :model="tool.forms" ref="formEl" label-position="top" size="large">
    <el-collapse accordion>
      <CreateListTransition name="list">
        <el-collapse-item v-for="(item, index) in tool.forms" :key="item.id">
          <template #title>
            <el-form-item
              flex-1
              @click="stop"
              :prop="`${index}.name`"
              :rules="rules.name"
            >
              <el-input
                v-model="item.name"
                placeholder="Please input name"
                maxlength="20"
                show-word-limit
              >
                <template #append>
                  <el-button id="expand">
                    <el-icon id="expand" class="i-carbon:row-expand"></el-icon>
                  </el-button>
                </template>
              </el-input>
              <template #label>
                <div w-full flex items-center justify-between>
                  <div>Name</div>
                  <div>
                    <el-button
                      @click="insertForm(index)"
                      round
                      size="small"
                      type="primary"
                    >
                      <el-icon class="i-carbon:add-alt mr-1"></el-icon> Insert
                    </el-button>
                    <el-button
                      @click="removeForm(index)"
                      :disabled="tool.forms?.length === 1"
                      round
                      size="small"
                      type="danger"
                    >
                      <el-icon class="i-carbon:subtract-alt mr-1"></el-icon>
                      Delete
                    </el-button>
                  </div>
                </div>
              </template>
            </el-form-item>
          </template>
          <div>
            <el-form-item
              label="Label"
              :prop="`${index}.label`"
              :rules="rules.label"
            >
              <el-input
                v-model="item.lable"
                placeholder="Please input label"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Type"
              :prop="`${index}.type`"
              :rules="rules.type"
            >
              <el-select
                placeholder="Please select type"
                w-full
                v-model="item.type"
              >
                <el-option
                  v-for="opt in formTypes"
                  :key="opt.value"
                  :value="opt.value"
                  :label="opt.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-divider> Props </el-divider>
            <div v-if="item.props">
              <el-form-item
                v-if="item.type === 'ElInput'"
                :prop="`${index}.props.type`"
                :rules="propsRules.type"
                label="Input Type"
              >
                <el-select
                  placeholder="Select input type"
                  w-full
                  clearable
                  v-model="item.props.type"
                >
                  <el-option value="textarea"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="item.type === 'ElSelect'"
                :rules="propsRules.options"
                :prop="`${index}.props.options`"
                label="Create Options"
              >
                <el-select
                  w-full
                  v-model="item.props.options"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  :reserve-keyword="false"
                  placeholder="Create select options"
                  no-data-text="Please input something"
                >
                </el-select>
              </el-form-item>
              <el-form-item
                label="Placeholder"
                :prop="`${index}.props.placeholder`"
                :rules="propsRules.placeholder"
              >
                <el-input
                  placeholder="Please input placeholder"
                  v-model="item.props.placeholder"
                  maxlength="100"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                label="Default"
                :prop="`${index}.props.default`"
                :rules="propsRules.default"
              >
                <el-input
                  placeholder="Please input default value"
                  v-model="item.props.default"
                  maxlength="100"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-collapse-item>
      </CreateListTransition>
    </el-collapse>
  </el-form>
</template>

<style>
.el-collapse {
  --el-collapse-header-height: auto;
  --el-collapse-border-color: transparent;
}
.el-collapse-item__arrow {
  display: none;
}
.el-form-item__label {
  padding-right: 0;
  display: flex !important;
  justify-content: flex-start;
}
.el-collapse-item__header .el-form-item {
  margin-bottom: 0;
}
.el-collapse-item__header {
  margin-bottom: 1rem;
}
</style>
