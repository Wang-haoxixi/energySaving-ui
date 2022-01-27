<template>
  <account-layout>
    <div class="top-title">
      <!-- <div class="right-code" title="微信扫码登录" @click="handleWechat()"></div> -->
      <div class="top-title-txt">
        <p v-if="form.type==='0'">{{$t('page.login.text.logintip')}}</p>
        <p v-else>手机号登录</p>
      </div>
    </div>
    <el-form class="iep-form-detail-block" :rules="rules" ref="form" :model="form">
      <el-form-item prop="username">
        <iep-ant-input
          v-if="form.type==='0'"
          v-model="form.username"
          autocomplete="username"
          :placeholder="$t('page.login.text.login.username.placeholder')"
          iconfont="el-icon-woneng-renwu-denglu"
        ></iep-ant-input>
        <iep-ant-input
          v-else
          v-model="form.username"
          autocomplete="username"
          :placeholder="$t('page.login.text.login.phone.placeholder')"
          iconfont="el-icon-woneng-shouji"
        ></iep-ant-input>
      </el-form-item>
      <password-select ref="PasswordSelect" v-model="form" @submit="mixinsSubmitFormGen()"></password-select>
      <div class="denglu-box">
        <el-button
          class="iep-btn-block"
          type="primary"
          size="medium"
          :loading="userLoading"
          @click="mixinsSubmitFormGen()"
        >{{$t("page.login.btn.login")}}</el-button>
      </div>
    </el-form>
    <div class="login-it">
      <other-select link="/register" text="注册"></other-select>
      <el-divider direction="vertical"></el-divider>
      <div class="login-type-select">
        <el-button v-if="form.type==='1'" type="text" @click="handleVCode()">账号登录</el-button>
        <el-button v-if="form.type==='0'" type="text" @click="handlePassword()">手机登录</el-button>
      </div>
    </div>
    <!-- <div class="page-account-txt">点击下一步代表你已阅读并同意节能宝<strong>服务协议</strong>和<strong>隐私政策</strong></div> -->
  </account-layout>
</template>
<script>
import * as types from "@/store/modules/common/mutation-types";
import AccountLayout from "@/page/Components/Layout";
import OtherSelect from "@/page/Components/OtherSelect";
import PasswordSelect from "./Password";
import formMixins from "@/mixins/formMixins";
import { mapActions, mapState, mapMutations } from "vuex";
import { initForm } from "./options";
import { getRedirect } from "@/util/util";
export default {
  components: {
    AccountLayout,
    PasswordSelect,
    OtherSelect,
  },
  mixins: [formMixins],
  data() {
    return {
      form: initForm(),
      rules: {
        username: [
          { required: true, message: "请输入手机号/用户名", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, message: "密码长度最少为6位", trigger: "change" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      userLoading: (state) => state.user.userLoading,
    }),
  },
  mounted() {
    this.setRedirect(getRedirect(this.$route));
    this.loadPage();
  },
  methods: {
    ...mapMutations({
      setRedirect: types.SET_REDIRECT,
    }),
    ...mapActions(["userLogin"]),
    handleWechat() {
      console.log(this.$route.params);
      this.$router.push({
        path: "/wechat",
        query: this.$route.query,
      });
    },
    refreshPage() {
      this.$router.push({
        path: "/login",
        query: { redirect: this.$route.query.redirect },
      });
    },
    refreshCode() {
      this.$refs["PasswordSelect"].refreshCode();
    },
    loadPage() {
      this.form.type = this.$route.query.type || "0";
      this.form.unionId = this.$route.query.unionId || "";
      this.form.wxCode = this.$route.query.wxCode || "";
      this.form.state = this.$route.query.state || "";
      this.refreshCode();
    },
    handleRetrieve() {
      this.$emit("tab-active", "retrieve");
    },
    handleVCode() {
      this.form.type = "0";
    },
    handlePassword() {
      this.form.type = "1";
      this.refreshCode();
    },
    async submitForm() {
      try {
        const { message } = await this.userLogin(this.form);
        if (message === "success") {
          this.$goToRedirect(this.$route);
        }
      } catch (err) {
        console.log(err);
        this.refreshCode();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.top-title {
  background-position-x: 60px;
  background-repeat: no-repeat;
  background-size: contain;
  .right-code {
    position: absolute;
    width: 52px;
    height: 52px;
    top: 25px;
    right: 20px;
    background: url(/img/login/logincode.png) no-repeat 0px 0px;
    background-size: 100%;
    cursor: pointer;
    z-index: 2;
  }
  .top-title-txt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    height: auto;
    text-align: left;
    p {
      margin-bottom: 0;
      font-size: 20px;
      // line-height: 34px;
      // letter-spacing: 2px;
    }
    span {
      font-size: 14px;
      line-height: 12px;
      color: $--color-text-secondary;
    }
  }
}
.login-it {
  position: absolute;
  right: 20px;
  bottom: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 10px;
}
.login-it ::v-deep .el-button--text {
  color: $--color-text-regular;
  &:hover {
    color: $--color-primary;
  }
  .el-divider {
    background-color: $--color-text-secondary;
  }
}
.page-account-txt {
  margin-top: 10px;
  font-size: 14px;
  color: $--color-text-secondary;
  strong {
    font-weight: 400;
    color: $--color-primary;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.iep-form-detail-block ::v-deep .el-form-item {
  margin-bottom: 30px;
}
.iep-form-detail-block ::v-deep .el-form-item .el-form-item__content,
.iep-form-detail-block ::v-deep .iep-input,
.iep-form-detail-block ::v-deep .el-input__inner,
.iep-btn-block {
  height: 54px;
  font-size: 16px;
}

.iep-form-detail-block ::v-deep .iep-input {
  width: 100%;
}
.iep-form-detail-block ::v-deep .el-input__inner {
  height: 50px;
  padding: 0 15px 0 35px;
}
.iep-form-detail-block ::v-deep .input-prefix {
  top: calc(50% - 3px);
  width: auto;
  height: auto;
  i {
    color: #babec0;
    font-size: 18px;
    font-weight: 400;
  }
}
.iep-form-detail-block ::v-deep .el-form-item {
  margin-bottom: 20px;
}
.iep-form-detail-block ::v-deep .el-form-item__error {
  display: none;
}
.iep-form-detail-block ::v-deep .right-code {
  position: relative;
}
.iep-form-detail-block ::v-deep .right-code .input-prefix {
  display: block !important;
}
.iep-form-detail-block ::v-deep .right-code .el-input__inner {
  padding: 0 130px 0 35px;
  border-radius: 10px;
}
.iep-form-detail-block ::v-deep .right-code .input-group-addon {
  height: 44px;
  width: 88px;
  position: absolute;
  top: -2px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  right: 15px;
  z-index: 100;
  img {
    width: 100%;
  }
}
.iep-form-detail-block .denglu-box {
  margin-top: 30px;
}
.login-it {
  position: static;
  margin: 0;
  margin-top: 10px;
}
.right-code {
  width: 40px !important;
  height: 40px !important;
}
</style>
