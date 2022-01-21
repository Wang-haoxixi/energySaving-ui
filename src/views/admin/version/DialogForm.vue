<template>
  <iep-dialog
    class="dialog"
    :dialog-show="dialogShow"
    :title="`${methodName}`"
    width="600px"
    @close="close"
  >
    <el-form :model="form" ref="form" label-width="85px" :disabled="disabled">
      <iep-form-item label-name="标题" prop="versionTitle">
        <el-input v-model="form.versionTitle" placeholder="请在此输入标题"></el-input>
      </iep-form-item>
      <iep-form-item label-name="版本号" prop="versionNumber">
        <el-input v-model="form.versionNumber" placeholder="请在此输入版本号"></el-input>
      </iep-form-item>
      <iep-form-item label-name="发布时间" prop="createTime">
        <iep-date-picker v-model="form.createTime" type="datetime" placeholder="请选择发布时间"></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="内容" prop="versionDesc">
        <iep-input-area v-model="form.versionDesc" placeholder="请在此输入更新内容"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="updateForm()">保存</el-button>
      <el-button @click="close">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from "./options";
export default {
  data() {
    return {
      dialogShow: false,
      disabled: false,
      formRequestFn: () => {},
      methodName: "",
      form: initForm(),
    };
  },
  methods: {
    close() {
      this.form = initForm();
      this.dialogShow = false;
      this.$emit("load-page");
    },
    async updateForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog ::v-deep .wrap-dialog {
  overflow: hidden !important;
}
</style>