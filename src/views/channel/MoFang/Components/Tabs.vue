<template>
  <div class="tabs">
    <div class="title">
      <span>{{title}}</span>
      <el-link @click="$openPage(listUrl)">显示全部</el-link>
    </div>
    <keep-alive>
      <iep-tabs v-if="showTabs" v-bind="$attrs" v-on="$listeners">
        <template v-slot:[$attrs.value]>
          <slot :name="$attrs.value"></slot>
        </template>
      </iep-tabs>
    </keep-alive>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    listUrl: {
      type: String,
      required: true,
    },
    showTabs: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  line-height: 18px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  span {
    font-size: 18px;
  }
}
.tabs ::v-deep .el-tabs__item {
  font-size: 14px;
  color: $--color-text-regular;
}
.tabs ::v-deep .el-tabs__item.is-active {
  font-size: 16px;
  color: $--color-primary;
}
</style>
