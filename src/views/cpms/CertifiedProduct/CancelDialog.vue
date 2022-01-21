<template>
  <iep-dialog :dialog-show="dialogShow" title="取消理由" width="500px" @close="_close()">
    <iep-input-area v-model="content" show-word-limit :maxlength="100" placeholder="请输入取消理由"></iep-input-area>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">保存</el-button>
      <el-button @click="close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { lossCheckCertifyManageById } from "@/api/dms/product";
export default {
  data() {
    return {
      id: null,
      content: "",
      dialogShow: false,
      submitFormLoading: false,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
    close() {
      this.content = "";
      this._close();
    },
    async submitForm() {
      this.submitFormLoading = true;
      try {
        const { data } = await lossCheckCertifyManageById(
          this.id,
          this.content,
        );
        if (data) {
          this.$message.success("操作成功");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this._close();
        this.content = "";
        this.submitFormLoading = false;
      }
    },
  },
};
</script>
