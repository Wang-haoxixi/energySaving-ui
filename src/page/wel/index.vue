<template>
  <account-layout>
    <div class="iep-form-detail-block" ref="form">
      <div class="content">
        <div class="wel-code" id="login_container"></div>
      </div>
      <div>
        <el-button
          class="iep-btn-block"
          size="medium"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >快速注册</el-button>
      </div>
    </div>
  </account-layout>
</template>
<script>
import AccountLayout from "@/page/Components/Layout";
import formMixins from "@/mixins/formMixins";
import axios from "axios";
import qs from "qs";

const appid = "wx92d9fe94daef034e";
const redirectUri = "127.0.0.1:9090/login";

export default {
  mixins: [formMixins],
  components: {
    AccountLayout,
  },
  data() {
    return {
      redirectUrl: "",
    };
  },
  methods: {
    welLogin() {
      // eslint-disable-next-line no-undef
      new WxLogin({
        self_redirect: true,
        id: "login_container",
        appid: appid,
        scope: "snsapi_login",
        redirect_uri: redirectUri,
        state: "",
        style: "",
        href: "",
      });
    },
  },
  mounted() {
    axios({
      method: "get",
      url:
        "https://open.weixin.qq.com/connect/qrconnect?appid=" +
        appid +
        "&redirect_uri=" +
        redirectUri +
        "&response_type=code&scope=snsapi_login&state=WX#wechat_redirect",
      data: qs.stringify({}),
    }).then(({ data }) => {
      console.log(data);
    });
    this.welLogin();
  },
};
</script>
