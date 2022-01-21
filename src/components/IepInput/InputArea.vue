<template>
  <el-input
    type="textarea"
    :autosize="autosize"
    :placeholder="placeholder"
    :maxlength="maxlength"
    v-bind="$attrs"
    :show-word-limit="showWordLimit"
    v-on="$listeners"
  ></el-input>
</template>
<script>
export default {
  name: "IepInputArea",
  inheritAttrs: false,
  props: {
    autosize: {
      type: Object,
      default: () => {
        return {
          minRows: 4,
        };
      },
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    maxlength: {
      type: Number,
      default: 2010,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
