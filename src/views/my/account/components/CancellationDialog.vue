<template>
  <iep-dialog title="接收验证码" :dialogShow="dialogShow" @close="_close()" width="400px">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="80px">
      <iep-form-item label-name="验证码" prop="code">
        <el-input v-model="form.code" :maxlength="4"></el-input>
      </iep-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">注销</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import { cancellationUser } from "@/api/admin/user";
import { mapActions } from "vuex";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      form: {
        code: "",
      },
    };
  },
  methods: {
    ...mapActions(["userLogout"]),
    _close() {
      this.form.code = "";
      this.dialogShow = false;
    },
    async submitForm() {
      const { data } = await cancellationUser(this.form);
      if (data.status) {
        await this.userLogout();
        this.$message.warning("您已成功注销，系统自动清除账号下所有信息。");
        setTimeout(() => {
          this.$openPage("/login");
        }, 3000);
        this._close();
      } else {
        this.$message.warning(data.message);
      }
    },
  },
};
</script>
