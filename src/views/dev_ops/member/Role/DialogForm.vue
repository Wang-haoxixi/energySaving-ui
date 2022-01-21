<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="新增角色"
    width="500px"
    @close="_close()"
    @mounted="loadTree()"
  >
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="auto">
      <iep-form-item label-name="名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入名称" :maxlength="50"></el-input>
      </iep-form-item>
      <iep-form-item label-name="描述" prop="roleDesc">
        <iep-input-area
          v-model="form.roleDesc"
          placeholder="请输入描述"
          :maxlength="200"
          show-word-limit
        ></iep-input-area>
      </iep-form-item>
      <el-divider></el-divider>
      <iep-form-item label-name="权限" prop="menuIds">
        <IepRoleTree
          style="width:100%"
          ref="menuTree"
          :data="treeData"
          :default-checked-keys="checkedKeys"
        ></IepRoleTree>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="handleSubmit()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
import { getDevOptRoleTree, createDevOptRole } from "@/api/admin/dev_ops";
class DevOptRoleDTO {
  roleName = "";
  roleDesc = "";
  menuIds = [];
}
export default {
  data() {
    return {
      dialogShow: false,
      form: new DevOptRoleDTO(),
      treeData: [],
      checkedKeys: [],
    };
  },
  computed: {
    roleIds() {
      const { menuTree } = this.$refs;
      if (menuTree) {
        return menuTree
          .getCheckedKeys()
          .join(",")
          .concat(",")
          .concat(menuTree.getHalfCheckedKeys().join(","));
      } else {
        return [];
      }
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new DevOptRoleDTO();
      this._close();
      this.$emit("load-page");
    },
    async loadTree() {
      const { data } = await getDevOptRoleTree();
      this.treeData = data;
    },
    async handleSubmit() {
      const { data } = await createDevOptRole({
        ...this.form,
        menuIds: this.roleIds,
      });
      if (data) {
        this.close();
      }
    },
  },
};
</script>
