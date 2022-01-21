<template>
  <el-date-picker :valueFormat="valueFormat" :editable="false" v-bind="$attrs" v-on="$listeners">
  </el-date-picker>
</template>
<script>
export default {
  name: "IepDatePicker",
  inheritAttrs: false,
  props: {
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss",
    },
  },
};
</script>
<style lang="css" scoped>
.el-date-editor >>> span {
  box-sizing: content-box;
}
</style>
