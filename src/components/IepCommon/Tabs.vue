<template>
  <el-tabs class="iep-tabs" v-bind="$attrs" v-on="$listeners">
    <slot name="right"></slot>
    <el-tab-pane
      v-for="tab in tabList"
      :label="tab.label"
      :name="tab.value"
      :key="tab.value"
      :disabled="tab.disabled"
    >
      <slot :name="tab.value"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "IepTabs",
  inheritAttrs: false,
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
// .iep-tabs ::v-deep .el-tabs__nav-wrap::after {
//   height: 1px;
// }
// .iep-tabs ::v-deep .el-tabs__nav {
//   padding-bottom: 17px;
// }
// .iep-tabs ::v-deep .el-tabs__item.is-active {
//   font-size: 16px;
// }
// .iep-tabs ::v-deep .el-tabs__item {
//   padding: 0 10px;
//   font-size: 14px;
//   height: 20px;
//   line-height: 20px;
// }
// ::v-deep .el-tabs__active-bar .is-top {
//   width: 52px;
//   transform: translateX(0);
// }
</style>
