<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      :useRoutePage="false"
      rowId="roleId"
      :loadFunction="getDevOpsRolePage"
      searchName="roleName"
    ></iep-crud-table>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
    <IepDialogPermission ref="IepDialogPermission" @load-page="loadPage()"></IepDialogPermission>
    <IepDialogRoleUserSelect ref="IepDialogRoleUserSelect" @load-page="loadPage()"></IepDialogRoleUserSelect>
  </div>
</template>
<script>
import { permissionUpd } from "@/api/admin/role";
import {
  getDevOpsRolePage,
  getDevOptRoleTree,
  delDevOptRoleById,
  setDevOptRole,
  getDevOptRoleUserListById,
  getDevOptRoleUserList,
} from "@/api/admin/dev_ops";
import { fetchRoleTree } from "@/api/admin/menu";
import DialogForm from "./DialogForm";
import { resolveAllEunuchNodeId } from "@/util/util";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      columnsMap: [
        {
          prop: "roleId",
          label: "ID",
          width: 80,
        },
        {
          prop: "roleName",
          label: "角色名称",
        },
        {
          prop: "roleDesc",
          label: "角色描述",
        },
      ],
      commonOptions: [
        {
          name: "新增角色",
          func: this.handleAdd,
        },
        {
          name: "授权管理",
          func: this.handleGiveRole,
        },
      ],
      operationOptions: [
        {
          name: "权限",
          func: this.handlePermission,
        },
        {
          name: "授权",
          func: this.handleGiveRole,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
    };
  },
  methods: {
    getDevOpsRolePage,
    loadPage() {
      console.log("object");
      this.$refs["CrudTable"].loadPage();
    },
    handleDel(row) {
      this._handleComfirm(row.roleId, delDevOptRoleById, "删除");
    },
    handleAdd() {
      this.$refs.DialogForm.dialogShow = true;
    },
    handleGiveRole(row) {
      this.$refs.IepDialogRoleUserSelect.prefixUrl = "admin/dev_ops/role";
      this.$refs.IepDialogRoleUserSelect.获取该角色已有的用户列表方法 = getDevOptRoleUserListById;
      this.$refs.IepDialogRoleUserSelect.保存该角色用户列表方法 = setDevOptRole;
      this.$refs.IepDialogRoleUserSelect.获取角色的所有用户列表方法 = getDevOptRoleUserList;
      this.$refs.IepDialogRoleUserSelect.roleId = row?.roleId;
      this.$refs.IepDialogRoleUserSelect.dialogShow = true;
    },
    async handlePermission(row) {
      const IepDialogPermission = this.$refs["IepDialogPermission"];
      IepDialogPermission.roleId = row.roleId;
      IepDialogPermission.title = row.roleName;

      const res = await fetchRoleTree(row.roleId);
      const checkedKeys = res.data;

      const { data } = await getDevOptRoleTree();
      IepDialogPermission.treeData = data;
      // 解析出所有的节点
      IepDialogPermission.checkedKeys = resolveAllEunuchNodeId(
        data,
        checkedKeys,
        [],
      );

      IepDialogPermission.formRequestFn = permissionUpd;
      IepDialogPermission.dialogShow = true;
    },
  },
};
</script>
