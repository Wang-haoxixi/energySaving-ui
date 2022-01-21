<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="绑定微信帐户"
    width="500px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <div id="qrcode"></div>
  </iep-dialog>
</template>
<script>
import { WXAPPID, WX_REDIRECT_URI_PREFIX } from "@/const/env";
import { mapMutations } from "vuex";
import * as types from "@/store/modules/common/mutation-types";
export default {
  name: "IepDialogWechat",
  props: {
    redirect: {
      type: String,
      default: "/my/account/third",
    },
  },
  data() {
    return {
      dialogShow: false,
    };
  },
  methods: {
    ...mapMutations({
      setWxRedirect: types.SET_WX_REDIRECT,
    }),
    _close() {
      this.dialogShow = false;
    },
    loadPage() {
      this.setWxRedirect(this.redirect);
      this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        new WxLogin({
          self_redirect: false,
          id: "qrcode",
          appid: WXAPPID,
          scope: "snsapi_login",
          redirect_uri: encodeURIComponent(
            `${WX_REDIRECT_URI_PREFIX}/authorizations?type=bind`,
          ),
          state: "WXPC",
          style: "black",
          href: "",
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#qrcode {
  text-align: center;
}
</style>
