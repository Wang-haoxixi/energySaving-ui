<template>
  <div class="tabs">
    <el-tabs class="iep-tabs" v-bind="$attrs" v-on="$listeners">
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
    <div class="search">
      <slot name="search"></slot>
    </div>
  </div>
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
.tabs {
  position: relative;
  .search {
    position: absolute;
    top: 10px;
    right: 0;
  }
}
.iep-tabs ::v-deep .el-tabs__nav-wrap::after {
  height: 1px;
}
.iep-tabs ::v-deep .el-tabs__item.is-active {
  font-size: 16px;
  color: $--color-primary;
}
.iep-tabs ::v-deep .el-tabs__item {
  margin-bottom: -1px;
  font-size: 14px;
  height: 22px;
  line-height: 22px;
}
</style>
