<template>
  <iep-dialog
    :dialog-show="dialogVisible"
    title
    width="350px"
    center
    @close="()=> {dialogVisible = false}"
    closeOnClickModal
  >
    <span>{{formData.payTitle || '查看此专栏'}}需要 {{formData.downloadCost}} 宝贝，是否确定进行支付？</span>
    <div class="form">
      <div class="label">支付密码：</div>
      <div class="span">
        <el-input type="password" :maxlength="6" v-model="safePassWord"></el-input>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </iep-dialog>
</template>

<script>
import { encryption } from "@/util/util";
import { materialPayment, materialSoPayment } from "@/api/dms/material";
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {},
      safePassWord: "",
      state: "",
    };
  },
  methods: {
    open(formData, state) {
      this.safePassWord = "";
      this.dialogVisible = true;
      this.formData = formData;
      this.state = state;
    },
    handleSubmit() {
      if (this.safePassWord.length !== 6) {
        this.msg = "请输入正确的支付密码";
      } else {
        const form = {
          safePassWord: this.safePassWord,
        };
        let fn = materialPayment;
        if (this.formData.isSo) {
          fn = materialSoPayment;
          form.ids = this.formData.id;
        } else {
          form.id = this.formData.id;
        }
        const data = encryption({
          data: form,
          param: ["safePassWord"],
        });
        fn(data).then(({ data }) => {
          if (data) {
            this.$message.success("支付成功！");
            this.dialogVisible = false;
            this.$emit("suceess_pay", data, this.state);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 20px;
  display: flex;
  .label {
    width: 80px;
    line-height: 30px;
  }
}
</style>
