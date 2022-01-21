<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="发币"
    width="500px"
    @close="close"
    @mounted="loadList()"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="95px">
      <iep-form-item label-name="发币金额" prop="amount">
        <iep-input-amount v-model="form.amount"></iep-input-amount>
      </iep-form-item>
      <iep-form-item label-name="备注" prop="remarks">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </iep-form-item>
      <iep-form-item label-name="安全密码" prop="safePassword">
        <span v-if="!userInfo.safePassword">
          请先去
          <el-link type="primary" @click="openSecurity()">账号设置 > 账号安全 设置安全密码</el-link>
        </span>
        <el-input v-else type="password" auto-complete="new-password" v-model="form.safePassword"></el-input>
      </iep-form-item>
      <iep-form-item label-name="第一手机号" prop="mobile">
        <el-input class="mobile-input" v-model="form.mobile" readonly disabled></el-input>
      </iep-form-item>
      <iep-form-item class="code-box" label-name="验证码" prop="code">
        <div class="v-code-wrapper">
          <el-input
            class="v-code-input"
            :maxlength="VCODEMAXLENGTH"
            v-model="form.code"
            autocomplete="new-password"
          ></el-input>
          <el-button
            class="sms-btn"
            :disabled="msgKey"
            @click="handleSMSSend(form.mobile)"
          >{{msgText}}</el-button>
        </div>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getMobileList } from "@/api/fms/mobile";
import { IssueDTO } from "./options";
import { mapGetters } from "vuex";
import formMixins from "@/mixins/formMixins";
import mobileMixins from "@/mixins/mobileMixins";
import { issuedAmount } from "@/api/fms/account";
import { encryption } from "@/util/util";
export default {
  mixins: [formMixins, mobileMixins],
  data() {
    return {
      form: new IssueDTO(),
      dialogShow: false,
      mobileList: [],
      rules: {
        amount: [
          {
            type: "number",
            required: true,
            message: "请输入的发币金额不少于 1 ",
            trigger: "blur",
            min: 1,
          },
        ],
        remarks: [{ message: "请输入的备注", trigger: "blur" }],
        safePassword: [
          { required: true, message: "请输入安全密码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async loadList() {
      const { data } = await getMobileList();
      this.mobileList = data;
      this.form.mobile = data[0].mobile;
      if (!data.length) {
        this.$message("请先设置手机号");
        this.close();
      }
    },
    openSecurity() {
      this.close();
      this.$openPage("/my/account/security");
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new IssueDTO();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const form = encryption({
        data: this.form,
        param: ["safePassword"],
      });
      const { data } = await issuedAmount(form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
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
::v-deep .v-code-wrapper .sms-btn {
  top: 3px;
}
.code-box ::v-deep .el-button {
  height: 34px !important;
}
</style>
