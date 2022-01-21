<template>
  <iep-dialog :dialog-show="dialogShow" title="个人信息" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <div class="avatar-wrap">
        <iep-img class="avatar" :src="form.avatar"></iep-img>
      </div>
      <iep-form-item label-name="用户名" prop="username">
        <el-input v-model.trim="form.username" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="真实姓名" prop="realName">
        <el-input v-model.trim="form.realName" disabled></el-input>
      </iep-form-item>
      <iep-form-item class="close" label-name="权限角色" prop="roleList">
        <IepSelectCommonList
          v-model="form.roleList"
          prefixUrl="admin/dev_ops/role"
          :props="{label:'name',value:'id'}"
          multiple
          placeholder="请选择角色"
        ></IepSelectCommonList>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
// 保存没做
import formMixins from "@/mixins/formMixins";
import { UserRoleDTO } from "./options";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      form: new UserRoleDTO(),
      roleList: [],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-wrap {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
