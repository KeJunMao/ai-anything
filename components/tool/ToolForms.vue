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
      // @ts-ignore
      this.$refs.form?.resetFields()
    },
    stop() {
      this.$emit("stop");
    },
  },
});
</script>
<template>
  <el-form :model="formData" ref="form" label-position="top" size="large">
    <el-form-item
      v-for="item in tool?.forms"
      :key="item.name"
      :label="item.lable"
      :prop="item.name"
    >
      <component
        w-full
        :is="item.type"
        v-model="formData[item.name]"
        v-bind="item.props"
        :readonly="readonly"
        :autosize="{ minRows: 3 }"
      >
        <el-option
          v-if="item.props.options && item.type === 'ElSelect'"
          v-for="opt in item.props.options"
          :value="opt"
        ></el-option>
      </component>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!loading" @click="submit" type="primary" w-full>
        <el-icon class="text-xl! i-carbon:send-alt-filled mr-2"></el-icon>
        {{ $t("tool.forms.submit") }}
      </el-button>
      <el-button v-else @click="stop" type="warning" w-full class="ml-0!">
        <el-icon class="text-xl! i-carbon:stop-filled mr-2"></el-icon>
        {{ $t("tool.forms.stop") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
