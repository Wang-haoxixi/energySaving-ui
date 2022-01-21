<template>
  <div class="page-account-other">
    <div>
      <!-- <span>其它登录方式</span>
      <img src="https://file.iviewui.com/admin-pro-dist/img/icon-social-wechat.c69ec08c.svg" alt="wechat" @click="$openPage('wechat')"> -->
      <!-- <img src="https://file.iviewui.com/admin-pro-dist/img/icon-social-qq.2cf4276d.svg" alt="qq">
      <img src="https://file.iviewui.com/admin-pro-dist/img/icon-social-weibo.cbf658a0.svg" alt="weibo"> -->
    </div>
    <div class="page-account-text">
      {{unlinkText}}
      <el-button type="text" @click="handleSaveJump()">{{text}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      default: "",
    },
    unlinkText: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleSaveJump() {
      this.$router.push({
        path: this.link,
        query: this.$route.query,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-account-other {
  // margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    font-size: 14px;
  }
  img {
    width: 24px;
    margin-left: 16px;
    cursor: pointer;
    vertical-align: middle;
    opacity: 0.7;
    transition: all 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
  .page-account-text {
    font-size: 14px;
    float: right;
  }
}
</style>
