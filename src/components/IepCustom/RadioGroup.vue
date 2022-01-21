<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners">
    <el-radio v-for="item in dictList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: "IepRadioGroup",
  inheritAttrs: false,
  props: {
    dictList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
