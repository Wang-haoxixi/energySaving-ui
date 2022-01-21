<template>
  <iep-dialog :dialog-show="dialogShow" title="文章新增" width="700px" @close="_close()">
    <MaterialForm class="new-column" ref="form" :isDialog="true" @load-page="close"></MaterialForm>

    <template slot="footer">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button @click="_close">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
// import { createForm, updateForm } from "@/api/dms/materialLevel";
import MaterialForm from "@/views/my/index/dynamic/material/form";

export default {
  components: { MaterialForm },
  data() {
    return {
      dialogShow: false,
    };
  },
  methods: {
    loadData() {
      this.dialogShow = true;
    },
    _close() {
      this.dialogShow = false;
      this.formData = { levelName: "" };
    },
    close() {
      this._close();
      this.$emit("load-page", true);
    },
    submitForm() {
      this.$refs.form.submitForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.new-column ::v-deep .el-form {
  margin-top: 0;
  width: 100%;
}
</style>
