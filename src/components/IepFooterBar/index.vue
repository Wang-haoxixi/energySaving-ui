<template>
  <div :class="prefixCls" class="clearfix">
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="float: left" class="right-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "IepFooterBar",
  props: {
    prefixCls: {
      type: String,
      default: "footer-bar",
    },
    extra: {
      type: [String, Object],
      default: "",
    },
  },
  computed: {
    // styleOption() {
    //   const menuWidth = this.isDesktop() ? "220px" : "64px";
    //   return {
    //     width: `calc(100% - ${menuWidth})`,
    //   };
    // },
  },
};
</script>
<style scoped>
.right-wrapper > * {
  margin-right: 15px;
}
* {
  outline: none;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.footer-toolbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  height: 56px;
  line-height: 56px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 0 24px;
  z-index: 500;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
}
.right-wrapper {
  // width: 100%;
  height: 56px;
  line-height: 56px;
  padding: 0 20px 0 120px;
  text-align: right;
  // box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  border: 0;
  z-index: 500;
}
.footer-bar ::v-deep {
  .el-button {
    padding: 0 26px;
    height: 42px;
    line-height: 14px;
    text-align: center;
  }
  .el-button--default {
    border-color: $--color-primary;
    color: $--color-primary;
    &:hover {
      // background-color: #feeceb;
      background-color: $--color-fifth;
      color: $--color-primary;
    }
  }
}
</style>
