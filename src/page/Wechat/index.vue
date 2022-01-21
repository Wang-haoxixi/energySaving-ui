<template>
  <account-layout>
    <div class="right-code" title="账号登录" @click="handleBack()"></div>
    <div id="qrcode" class="qrcode-box"></div>
    <el-button icon="el-icon-back" @click="handleBack()" round>使用帐号密码登录</el-button>
  </account-layout>
</template>
<script>
import { WXAPPID, WX_REDIRECT_URI_PREFIX } from "@/const/env";
import AccountLayout from "@/page/Components/Layout";
import { mapMutations } from "vuex";
import * as types from "@/store/modules/common/mutation-types";

export default {
  components: {
    AccountLayout,
  },
  mounted() {
    // debugger;
    this.setWxRedirect(
      this.$route.query.redirect
        ? decodeURIComponent(this.$route.query.redirect)
        : "",
    );
    // eslint-disable-next-line no-undef
    new WxLogin({
      self_redirect: false,
      id: "qrcode",
      appid: WXAPPID,
      scope: "snsapi_login",
      redirect_uri: encodeURIComponent(
        `${WX_REDIRECT_URI_PREFIX}/authorizations?type=login`,
      ),
      state: "WXPC",
      style: "black",
      href: `${window.location.origin}/cdn/wechat/code.css`,
    });
  },
  methods: {
    ...mapMutations({
      setWxRedirect: types.SET_WX_REDIRECT,
    }),
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.right-code {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 25px;
  right: 20px;
  background: url(/img/login/logincode-2.png) no-repeat 0px 0px;
  background-size: 100%;
  cursor: pointer;
  z-index: 2;
}
</style>
