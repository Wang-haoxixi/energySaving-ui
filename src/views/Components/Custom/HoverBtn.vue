<template>
  <el-button
    class="follow-btn"
    size="mini"
    :type="btnType"
    :icon="btnIcon"
    :title="btnTitle"
    plain
    v-bind="$attrs"
    v-on="$listeners"
    v-hover="{ms:()=>{btnFlag=true},mo:()=>{btnFlag=false}}"
  >{{btnCtx}}</el-button>
</template>

<script>
export default {
  name: "IepHoverBtn",
  inheritAttrs: false,
  props: {
    isFlag: {
      type: Number,
      required: true,
    },
    btnText: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      btnFlag: false,
    };
  },
  computed: {
    btnType() {
      return this.isFlag ? "default" : "primary";
    },
    btnIcon() {
      return this.isFlag ? "" : "el-icon-woneng-jiahao";
    },
    btnTitle() {
      if (this.btnText.constructor === String) {
        return this.isFlag ? `取消${this.btnText}` : this.btnText;
      } else if (this.btnText.constructor === Object) {
        return this.isFlag ? this.btnText.cancel : this.btnText.default;
      } else {
        console.log("btnText传参错误");
        return "";
      }
    },
    btnCtx() {
      if (this.btnText.constructor === String) {
        return this.isFlag
          ? this.btnFlag
            ? `取消${this.btnText}`
            : `已${this.btnText}`
          : this.btnText;
      } else if (this.btnText.constructor === Object) {
        return this.isFlag
          ? this.btnFlag
            ? this.btnText.cancel
            : this.btnText.active
          : this.btnText.default;
      } else {
        console.log("btnText传参错误");
        return "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-btn {
  background: none;
  i {
    font-size: 12px;
  }
}
.follow-btn.el-button--default {
  border-color: rgba(244, 245, 246, 1);
  background: rgba(244, 245, 246, 1);
  color: $--color-text-secondary;
}
</style>
