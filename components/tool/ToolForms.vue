<script lang="ts">
import { ToolItem } from "~/composables/useTools";
import { ElInput } from "element-plus";

export default defineComponent({
  components: { ElInput },
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
        :is="item.type"
        v-model="formData[item.name]"
        v-bind="item.props"
        :readonly="readonly"
      />
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" @click="submit" type="primary" w-full
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>
