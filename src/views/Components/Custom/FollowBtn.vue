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
    v-hoverSpan="{isFlag:item.isFollowed,default:'关注',cancel:'取消关注',active:'已关注'}"
  ></el-button>
</template>

<script>
export default {
  name: "IepFollowBtn",
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    btnType() {
      return this.item.isFollowed ? "default" : "primary";
    },
    btnIcon() {
      return this.item.isFollowed ? "" : "el-icon-woneng-jiahao";
    },
    btnTitle() {
      return this.item.isFollowed ? "取消关注" : "关注";
    },
    // btnCtx() {
    //   return this.item.isFollowed
    //     ? this.btnFlag
    //       ? "取消关注"
    //       : "已关注"
    //     : "关注";
    // },
  },
};
</script>
<style lang="scss" scoped>
.follow-btn {
  width: 60px;
  padding: 0;
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
