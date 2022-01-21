<template>
  <div class="change-form">
    <h2>注销</h2>
    <el-form class="inline" :model="form" ref="form" label-width="68px" inline>
      <i class="el-icon-woneng-shouji"></i>
      <iep-form-item label-name="账号" prop="mobile" class="iep-form-half-block">
        <el-input v-model="form.mobile" disabled></el-input>
      </iep-form-item>
      <el-form-item class="iep-form-half-block">
        <el-button type="primary" @click="handleConfirmCancellation()">注销账号</el-button>
      </el-form-item>
    </el-form>
    <CancellationDialog ref="CancellationDialog"></CancellationDialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { cancellationCodeSendByMobile } from "@/api/admin/mobile";
import operationMixins from "@/mixins/operationMixins";
import CancellationDialog from "./components/CancellationDialog";
function initForm() {
  return {
    mobile: "",
  };
}
export default {
  components: {
    CancellationDialog,
  },
  mixins: [operationMixins],
  data() {
    return {
      form: initForm(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.form.mobile = this.userInfo.mobile;
  },
  methods: {
    async handleConfirmCancellation() {
      this.$confirm(
        "一旦注销账号，账号下所有材料、说说、代理等内容都将会被永久删除。这是一个不可恢复的操作，请谨慎对待！",
        "账号注销",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          setTimeout(async () => {
            const { code, message } = await cancellationCodeSendByMobile(
              this.form.mobile,
            );
            if (code) {
              this.$message.warning(message);
            } else {
              this.$message.success("短信验证码已发送!");
              this.$refs["CancellationDialog"].dialogShow = true;
            }
          }, 1000);
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.change-form {
  padding: 20px;
  background-color: #fff;
  .inline {
    display: flex;
    align-items: center;
    i {
      margin-right: -10px;
      margin-bottom: 0;
      font-size: 24px;
    }
  }
}
.change-form ::v-deep .el-form {
  padding: 10px 0;
}
.iep-form-half-block {
  margin-bottom: 0;
}
</style>
