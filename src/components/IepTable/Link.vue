<template>
  <el-badge :hidden="!isDot || !!isRead" is-dot class="item">
    <el-link
      class="iep-ellipsis-flex"
      :type="isRead ? 'info' : 'default'"
      :underline="underline"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </el-link>
  </el-badge>
</template>
<script>
export default {
  name: "IepTableLink",
  props: {
    underline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Number,
      default: 0,
    },
    isDot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.item ::v-deep .is-dot {
  top: 13px;
  right: -3px;
  background: $--color-primary;
}
</style>
