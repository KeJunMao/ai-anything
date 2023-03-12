<script lang="ts" setup>
import { ToolItem } from "~/composables/useTools";

const props = defineProps<{
  tool: ToolItem;
}>();
const show = ref(false);
const { remove } = useCustomTools();
function handleRemove() {
  remove(props.tool.id!);
  navigateTo("/", {
    replace: true,
  });
}
</script>

<template>
  <div>
    <el-button text @click="show = true">
      <el-icon class="i-carbon:settings"></el-icon>
    </el-button>
    <el-dialog
      :title="`${tool.name || 'Tool'} Settings`"
      v-model="show"
      append-to-body
    >
      <el-form label-position="top">
        <el-form-item label="TODO"> // TODO </el-form-item>
        <el-form-item label="Action">
          <div flex w-full justify-between>
            <div>
              <el-button>Share</el-button>
              <el-button>Export</el-button>
            </div>
            <el-button @click="handleRemove" type="danger">Remove</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
