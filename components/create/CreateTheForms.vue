<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";

const { tool } = useCreateTool();
const formTypes = [
  {
    value: "ElInput",
    name: "Input",
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
</script>

<template>
  <h3 mb-2 text text-gray>The Forms</h3>
  <el-form label-position="top" size="large">
    <el-collapse accordion>
      <CreateListTransition name="list">
        <el-collapse-item v-for="(item, index) in tool.forms" :key="item.id">
          <template #title>
            <el-form-item flex-1 @click="stop">
              <el-input v-model="item.name" placeholder="Please input name">
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
            <el-form-item label="Label">
              <el-input
                v-model="item.lable"
                placeholder="Please input label"
              ></el-input>
            </el-form-item>
            <el-form-item label="Type">
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
            <el-form size="large" v-if="item.props">
              <el-form-item v-if="item.type === 'ElInput'" label="Input Type">
                <el-select
                  placeholder="Select input type"
                  w-full
                  clearable
                  v-model="item.props.type"
                >
                  <el-option value="textarea"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Placeholder">
                <el-input
                  placeholder="Please input placeholder"
                  v-model="item.props.placeholder"
                ></el-input>
              </el-form-item>
              <el-form-item label="Default">
                <el-input
                  placeholder="Please input default value"
                  v-model="item.props.default"
                ></el-input>
              </el-form-item>
            </el-form>
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
}
.el-collapse-item__header .el-form-item {
  margin-bottom: 0;
}
.el-collapse-item__header {
  margin-bottom: 1rem;
}
</style>
