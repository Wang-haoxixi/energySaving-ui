<template>
  <account-layout>
    <p class="title">注册节能宝</p>
    <el-form class="iep-form-detail-block" :rules="rules" ref="form" :model="form">
      <el-form-item prop="mobile">
        <iep-ant-input
          class="input"
          v-model="form.mobile"
          type="phone"
          autocomplete="username"
          placeholder="请输入手机号码"
          iconfont="el-icon-woneng-shouji"
        ></iep-ant-input>
      </el-form-item>
      <el-form-item prop="vCode">
        <div class="v-code-wrapper">
          <iep-ant-input
            class="v-code-input"
            :maxlength="VCODEMAXLENGTH"
            v-model="form.vCode"
            placeholder="请输入验证码"
            iconfont="el-icon-key"
          ></iep-ant-input>
          <el-button
            class="sms-btn"
            :disabled="msgKey"
            @click="handleSMSSend(form.mobile)"
          >{{msgText}}</el-button>
        </div>
      </el-form-item>
      <p style="text-align: left;" class="agree-box">
        <el-checkbox v-model="checked">
          已阅读并同意
          <span class="iep-red" @click="$openPage('/protocol/service_agreement')">《用户服务协议》</span>
          和
          <span class="iep-red" @click="$openPage('/protocol/privacy_policy')">《隐私协议》</span>
        </el-checkbox>
      </p>
      <div>
        <el-button
          class="iep-btn-block"
          :class="{disabled:!checked}"
          :disabled="!checked"
          type="primary"
          size="medium"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >快速注册</el-button>
      </div>
    </el-form>
    <other-select link="/login" text="立即登录" unlink-text="已有账号？" class="login-box"></other-select>
  </account-layout>
</template>
<script>
import AccountLayout from "@/page/Components/Layout";
import OtherSelect from "@/page/Components/OtherSelect";
import formMixins from "@/mixins/formMixins";
import mobileMixins from "@/mixins/mobileMixins";
import { validRegisterUserPhone } from "@/api/admin/mobile";
import { postRegister } from "@/api/admin/user";
import { isvalidatemobile } from "@/util/validate";
import { VCODEMAXLENGTH } from "@/const/env";
export default {
  mixins: [formMixins, mobileMixins],
  components: {
    AccountLayout,
    OtherSelect,
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
      } else {
        validRegisterUserPhone(value).then(({ data }) => {
          if (!data) {
            callback(new Error("该手机号已存在，请更换"));
          } else {
            callback();
          }
        });
      }
    };
    return {
      VCODEMAXLENGTH,
      checked: true,
      form: {
        username: "",
        mobile: "",
        vCode: "",
        code: "",
        type: "1",
      },
      rules: {
        mobile: [
          { required: true, trigger: "change", validator: validatePhone },
        ],
        vCode: [
          { required: true, trigger: "change", message: "请输入短信验证码" },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      this.form.code = this.form.vCode;
      this.form.username = this.form.mobile;
      const { data } = await postRegister(this.form);
      if (data) {
        this.$message.success("恭喜你，注册成功");
        const data = await this.$store.dispatch("userLogin", this.form);
        if (data.access_token) {
          this.$goToRedirect(this.$route);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mobile.scss";
.title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
}
.iep-form-detail-block ::v-deep .el-form-item {
  margin-bottom: 20px;
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
.agree-box {
  margin: 0px 0 20px 10px;
}
.login-box {
  margin-top: 10px;
}
.iep-btn-block.disabled {
  background-color: $--background-color;
  color: #cecece;
}
.iep-btn-block.disabled:hover {
  background-color: $--background-color;
  color: #cecece;
}
.sms-btn {
  border-radius: 0 10px 10px 0;
  color: $--color-primary;
  height: 48px !important;
}
</style>
