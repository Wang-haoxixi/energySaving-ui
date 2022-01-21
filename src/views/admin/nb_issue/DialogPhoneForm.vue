<template>
  <iep-dialog :dialog-show="dialogShow" title="添加手机号" width="500px" @close="close">
    <el-form :model="form" :rules="rules" ref="form" label-width="90px">
      <iep-form-item label-name="安全密码" prop="safePassword">
        <span v-if="!userInfo.safePassword">
          请先去
          <el-link type="primary" @click="openSecurity()">账号设置 > 账号安全 设置安全密码</el-link>
        </span>
        <el-input v-else type="password" autocomplete="false" v-model="form.safePassword"></el-input>
      </iep-form-item>
      <iep-form-item label-name="新手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </iep-form-item>
      <iep-form-item label-name="验证码" prop="code">
        <div class="v-code-wrapper">
          <el-input
            class="v-code-input"
            :maxlength="VCODEMAXLENGTH"
            v-model="form.code"
            autocomplete="new-password"
          ></el-input>
          <el-button
            class="sms-btn"
            style="top: 3px;height: 34px;"
            :disabled="msgKey"
            @click="handleSMSSend(form.mobile)"
          >{{msgText}}</el-button>
        </div>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { isvalidatemobile } from "@/util/validate";
import formMixins from "@/mixins/formMixins";
import mobileMixins from "@/mixins/mobileMixins";
import { createMobile } from "@/api/fms/mobile";
import { PhoneDTO } from "./options";
import { mapGetters } from "vuex";
import { encryption } from "@/util/util";
export default {
  mixins: [formMixins, mobileMixins],
  data() {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
      } else {
        callback();
      }
    };
    return {
      form: new PhoneDTO(),
      dialogShow: false,
      rules: {
        mobile: [
          { required: true, trigger: "change", validator: validatePhone },
        ],
        code: [
          { required: true, trigger: "change", message: "请输入短信验证码" },
        ],
        safePassword: [
          { required: true, message: "请输入安全密码", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    openSecurity() {
      this.close();
      this.$openPage("/my/account/security");
    },
    async submitForm() {
      const form = encryption({
        data: this.form,
        param: ["safePassword"],
      });
      const { data } = await createMobile(form);
      if (data) {
        this.$message("操作成功");
        this.close();
      }
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new PhoneDTO();
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mobile.scss";
.change-form {
  margin: 20px;
}
.sms-btn {
  height: 32px;
}
</style>
