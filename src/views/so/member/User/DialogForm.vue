<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="个人信息"
    width="450px"
    @close="_close()"
    @mounted="load()"
  >
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <div class="avatar-wrapper">
        <iep-img class="avatar" :src="form.avatar" :resizeOpt="{l:140}"></iep-img>
        <IepIdentitySvg v-if="form.isAdmin" class="identity" :type="form.isAdmin"></IepIdentitySvg>
      </div>
      <iep-form-item label-name="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入真实姓名" disabled></el-input>
      </iep-form-item>
      <iep-form-item class="close" label-name="权限角色" prop="roleIds">
        <el-select v-model="form.roleIds" multiple placeholder="请选择角色" disabled>
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
import { initForm } from "./options";
import formMixins from "@/mixins/formMixins";
import { getRoleList } from "@/api/admin/role";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      formRequestFn: () => {},
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
      const { data } = await this.formRequestFn(this.form);
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
.avatar-wrapper {
  position: relative;
  margin: 0 auto 30px auto;
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 140px;
    height: 140px;
    margin: 0;
  }

  .identity {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
.close ::v-deep .el-tag__close {
  color: #fff;
}
</style>
