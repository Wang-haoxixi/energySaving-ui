<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form :model="form" ref="form" label-width="120px" :disabled="disabled">
      <iep-form-item label-name="角色名称" prop="roleName">
        <el-input v-model.trim="form.roleName" placeholder="请填入角色名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="角色编码" prop="roleCode">
        <el-input v-model.trim="form.roleCode" placeholder="请填入角色编码" :disabled="roleCodeDisabled"></el-input>
      </iep-form-item>
      <iep-form-item label-name="角色备注" prop="roleDesc">
        <el-input v-model.trim="form.roleDesc" placeholder="请填入角色备注"></el-input>
      </iep-form-item>
      <iep-form-item label-name="是否通用" prop="isCommon">
        <el-switch
          v-model="form.isCommon"
          active-color="#13ce66"
          inactive-color="#eff0f1"
          active-text="是"
          inactive-text="否"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dsType: [],
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
      roleCodeDisabled: false,
      // dsScopeData: [],
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
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
