<template>
  <div></div>
</template>
<script>
import { socialBindAccount, getBindCheck } from "@/api/admin/social";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      state: this.$route.query.state,
      code: this.$route.query.code,
    };
  },
  mounted() {
    if (this.$route.query.type === "bind") {
      this.bindAccount();
    }
    if (this.$route.query.type === "login") {
      this.handleSocialLogin();
    }
  },
  methods: {
    ...mapActions(["userLoginBySocial"]),
    async handleSocialLogin() {
      const socialForm = {
        state: this.state,
        code: this.code,
      };
      const { code, data, message } = await getBindCheck(socialForm);
      if (code) {
        return;
      }
      if (data.type === 0) {
        await this.userLoginBySocial(socialForm);
        this.$goToRedirect(this.$route, true);
      } else {
        this.$notify({
          title: message,
          message: "您未绑定微信账号， 请登录绑定后再行操作！",
          duration: 5000,
        });
        this.$router.push({
          path: "/login",
          query: {
            type: "1",
            wxCode: this.code,
            state: this.state,
            unionId: data.unionId,
          },
        });
      }
    },
    async bindAccount() {
      try {
        const { data } = await socialBindAccount({
          state: this.state,
          code: this.code,
        });
        if (data) {
          this.$message.success("绑定成功");
        }
        this.$goToRedirect(this.$route, true);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
