<template>
  <el-button
    class="perfect"
    :type="type"
    :title="title"
    :icon="icon"
    v-bind="$attrs"
    v-on="$listeners"
  ></el-button>
</template>
<script>
export default {
  name: "IepCardBtn",
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: "点击查看名片",
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "el-icon-woneng-ren-ziliao1",
    },
  },
};
</script>
<style lang="scss" scoped>
.perfect ::v-deep i {
  font-size: 16px;
  // color: $--color-text-secondary;
  color: $--color-primary;
}
.perfect {
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 0;
  line-height: 22px;
  border: 0;
  &:hover {
    background: none;
    color: $--color-primary;
    ::v-deep i {
      color: $--color-primary;
    }
  }
}
</style>
