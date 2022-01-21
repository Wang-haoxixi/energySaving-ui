<template>
  <el-button :plain="plain" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>
<script>
export default {
  name: "IepButton",
  inheritAttrs: false,
  props: {
    plain: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="css" scoped>
.el-button + .el-button {
  margin-left: 0;
}
</style>
