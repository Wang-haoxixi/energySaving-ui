<template>
  <iep-dialog
    :dialog-show="dialogVisible"
    title="删除理由"
    width="450px"
    center
    @close="()=> {dialogVisible = false}"
    closeOnClickModal
  >
    <div class="form">
      <div class="title">删除理由：</div>
      <el-input type="textarea" :rows="3" maxlength="500" show-word-limit placeholder="请输入删除理由"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </iep-dialog>
</template>

<script>
import { operationDelete } from "@/api/qms/cooperation_task";
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {},
      state: "",
    };
  },
  methods: {
    open(id) {
      this.formData = {
        taskId: id,
      };
      this.dialogVisible = true;
    },
    handleSubmit() {
      operationDelete(this.formData).then(({ data }) => {
        if (data) {
          this.dialogVisible = false;
          this.$emit("load-page");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 20px;
  display: flex;
  .title {
    width: 90px;
  }
}
</style>
