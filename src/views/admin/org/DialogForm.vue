<template>
  <iep-dialog :dialog-show="dialogShow" title="编辑" width="500px" @close="_close()">
    <el-form :model="form" label-width="120px">
      <div class="avatar-wrapper">
        <iep-upload-avatar v-model="form.avatar"></iep-upload-avatar>
      </div>
      <iep-form-item label-name="组织名称" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from "./options";
import { putOrg } from "@/api/admin/org";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      form: initForm(),
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await putOrg(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.avatar-wrapper ::v-deep .iep-image {
  width: 109px;
  height: 109px;
  border: 1px solid $--border-color;
}
</style>
