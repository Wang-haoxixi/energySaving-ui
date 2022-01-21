<template>
  <div class="change-form">
    <h2>账号密码</h2>
    <el-form
      class="iep-form-detail form-wrapper"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
    >
      <iep-form-item label-name="账号" prop="mobile" class="iep-form-half-block">
        <el-input class="mobile-input" v-model="form.mobile" readonly></el-input>
      </iep-form-item>
      <iep-form-item label-name="验证码" prop="code" class="iep-form-half-block">
        <div class="v-code-wrapper">
          <el-input
            class="v-code-input"
            :maxlength="VCODEMAXLENGTH"
            v-model="form.code"
            autocomplete="false"
          ></el-input>
          <el-button
            class="sms-btn"
            :disabled="msgKey"
            @click="handleSMSSend(form.phone)"
          >{{msgText}}</el-button>
        </div>
      </iep-form-item>
      <iep-form-item label-name="新密码" prop="newPassword" class="iep-form-half-block">
        <IepPasswordAuto
          v-model="form.newPassword"
          placeholder="请输入6-16位且包含数字、大小写字母的新密码"
          type="password"
          @blur="handleBlur('newPassword')"
        ></IepPasswordAuto>
      </iep-form-item>
      <iep-form-item label-name="确认新密码" prop="confirmPassword" class="iep-form-half-block">
        <el-input v-model="form.confirmPassword" type="password" autocomplete="new-password"></el-input>
      </iep-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="iep-btn-submit"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import formMixins from "@/mixins/formMixins";
import mobileMixins from "@/mixins/mobileMixins";
import { resetPassword } from "@/api/admin/user";
import { encryption } from "@/util/util";
function initForm() {
  return {
    mobile: "",
    phone: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  };
}
export default {
  mixins: [formMixins, mobileMixins],
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (value.length > 16 || value.length < 6)
          return callback(new Error("长度在 6 - 16 个字符"));
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
        if (!reg.test(value))
          return callback(new Error("新的密码需包含数字、大写字母和小写字母"));
        if (this.form.confirmPassword !== "")
          this.$refs.form.validateField("confirmPassword");
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认您输入的新密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: initForm(),
      rules: {
        newPassword: [
          { required: true, validator: validateNewPassword, trigger: "blur" },
        ],
        confirmPassword: [
          {
            required: true,
            validator: validateConfirmPassword,
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.form.mobile = this.userInfo.mobile;
    this.form.phone = this.userInfo.phone;
  },
  methods: {
    ...mapActions(["userLogout"]),
    async submitForm() {
      try {
        const form = encryption({
          data: this.form,
          param: ["newPassword"],
        });
        delete form.confirmPassword;
        const { data } = await resetPassword(form);
        if (data) {
          this.$message.success(
            "密码修改成功！请重新登录，3秒后即刻跳转到登录页",
          );
          await this.userLogout();
          setTimeout(() => {
            this.$openPage("/login");
          }, 3000);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    handleBlur(v) {
      this.$refs.form.validateField(v);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mobile.scss";
.sms-btn {
  height: 32px;
}
.mobile-input ::v-deep .el-input__inner {
  background: $--background-color;
  color: $--color-input-regular;
}
.mobile-input ::v-deep .el-input__inner:hover,
.mobile-input ::v-deep .el-input__inner:focus {
  border-color: $--border-color;
  box-shadow: none;
}
</style>
