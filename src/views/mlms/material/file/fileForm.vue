<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form :model="formData" :rules="rules" label-width="95px" ref="form">
      <iep-form-item label-name="分类名称" prop="levelName">
        <el-input v-model="formData.levelName" :maxlength="15"></el-input>
      </iep-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button @click="_close">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
import { createForm, updateForm } from "@/api/dms/materialLevel";

export default {
  data() {
    return {
      formData: {
        levelName: "",
      },
      methodName: "新增",
      rules: {
        levelName: [{ required: true, message: "必填", trigger: "blur" }],
      },
      dialogShow: false,
    };
  },
  methods: {
    loadData(state, row = {}) {
      this.dialogShow = true;
      if (state === "create") {
        this.methodName = "新增";
        this.requestFn = createForm;
        if (row.id >= 0) this.formData.parentId = row.id;
      } else {
        this.methodName = "修改";
        this.requestFn = updateForm;
        this.formData = row;
      }
    },
    _close() {
      this.dialogShow = false;
      this.formData = { levelName: "" };
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.requestFn(this.formData).then(({ data }) => {
            if (data) {
              this.$message.success(`${this.methodName}成功！`);
              this.close();
            } else {
              this.$message.error("操作失败");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
