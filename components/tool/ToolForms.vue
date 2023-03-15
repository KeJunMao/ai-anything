<script lang="ts">
import { ElInput, ElSelect, ElOption } from "element-plus";
import { ToolItem } from "~/types";

export default defineComponent({
  components: { ElInput, ElSelect, ElOption },
  props: {
    tool: Object as PropType<ToolItem>,
    readonly: Boolean,
    loading: Boolean,
  },
  setup(props) {
    const { formData } = useToolFormData(props.tool!);
    return {
      formData,
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.formData);
    },
  },
});
</script>
<template>
  <el-form label-position="top" size="large">
    <el-form-item
      v-for="item in tool?.forms"
      :key="item.name"
      :label="item.lable"
    >
      <component
        w-full
        :is="item.type"
        v-model="formData[item.name]"
        v-bind="item.props"
        :readonly="readonly"
      >
        <el-option
          v-if="item.props.options && item.type === 'ElSelect'"
          v-for="opt in item.props.options"
          :value="opt"
        ></el-option>
      </component>
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" @click="submit" type="primary" w-full
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>
