<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`${methodName}`"
    width="500px"
    @close="_close()"
    @mounted="load()"
  >
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <iep-form-item class="close" label-name="权限角色" prop="roleIds">
        <el-select v-model="form.roleIds" multiple placeholder="请选择角色">
          <el-option
            v-for="item in roleOptions"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
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
import { getRoleList } from "@/api/admin/role";
const initForm = () => {
  return {
    userId: null,
    roleIds: [],
  };
};
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
      roleOptions: [],
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
      const { data } = await this.formRequestFn({
        userId: this.form.userId,
        roleIds: this.form.roleIds,
      });
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
    async load() {
      const { data } = await getRoleList();
      this.roleOptions = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.close ::v-deep .el-tag__close {
  color: #fff;
}
</style>
