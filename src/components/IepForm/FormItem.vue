<template>
  <el-form-item ref="formItem" v-bind="$attrs" v-on="$listeners">
    <span slot="label">
      {{ labelName }}
      <iep-tip v-if="tip" :content="tip"></iep-tip>:
    </span>
    <slot></slot>
  </el-form-item>
</template>
<script>
export default {
  name: "IepFormItem",
  inheritAttrs: false,
  props: {
    tip: {
      type: String,
      default: "",
    },
    labelName: {
      type: String,
      required: false,
    },
    verifValue: {
      type: [Boolean, String, Number, Object, Array],
      default: null,
    },
  },
  methods: {
    triggerVerification() {
      this.$refs["formItem"].onFieldChange();
      this.$refs["formItem"].onFieldBlur();
    },
  },
  mounted() {
    if (this.verifValue !== null)
      this.$watch("verifValue", this.triggerVerification);
  },
};
</script>
