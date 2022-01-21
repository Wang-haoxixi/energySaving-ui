<template>
  <div class="change-form">
    <h2>更改手机号</h2>
    <el-form
      class="iep-form-detail form-wrapper"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
    >
      <iep-form-item label-name="新手机号" prop="mobile" class="iep-form-half-block">
        <el-input v-model="form.mobile" placeholder="请输入新的手机号码"></el-input>
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
            @click="handleSMSSend(form.mobile)"
          >{{msgText}}</el-button>
        </div>
      </iep-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="iep-btn-submit"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >更换</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import mobileMixins from "@/mixins/mobileMixins";
import { userChangeMobile } from "@/api/admin/user";
import { validRegisterUserPhone } from "@/api/admin/mobile";
import { isvalidatemobile } from "@/util/validate";
import { mapActions } from "vuex";
function initForm() {
  return {
    mobile: "",
    code: "",
  };
}
export default {
  mixins: [formMixins, mobileMixins],
  data() {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
      } else {
        validRegisterUserPhone(value).then(({ data }) => {
          if (!data) {
            callback(new Error("该手机号已存在，请更换！"));
          } else {
            callback();
          }
        });
      }
    };
    return {
      form: initForm(),
      rules: {
        mobile: [
          { required: true, trigger: "change", validator: validatePhone },
        ],
        code: [
          { required: true, trigger: "change", message: "请输入短信验证码" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["userLogout"]),
    async submitForm() {
      try {
        const { data } = await userChangeMobile(this.form);
        if (data) {
          this.$message.success(
            "账号绑定手机修改成功！请重新登录，3秒后即刻跳转到登录页",
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
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mobile.scss";
.sms-btn {
  height: 32px;
}
</style>
