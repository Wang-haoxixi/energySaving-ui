<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form :model="form" ref="form" :rules="rules" label-width="95px">
      <iep-form-item label-name="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="角色描述" prop="roleDesc">
        <iep-input-area v-model="form.roleDesc" show-word-limit :maxlength="100"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
import formMixins from "@/mixins/formMixins";
import { initRoleForm } from "./options";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      methodName: "新增",
      form: initRoleForm(0),
      formRequestFn: () => {},
      rules: {
        roleName: [
          { required: true, message: "请填写角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请填写角色描述", trigger: "blur" },
          { max: 500, message: "长度在不少于500个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    load(appId) {
      this.form = initRoleForm(appId);
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initRoleForm(0);
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
