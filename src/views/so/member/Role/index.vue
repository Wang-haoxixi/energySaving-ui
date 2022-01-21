<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      rowId="roleId"
      searchName="roleName"
      :loadFunction="getOrgRolePage"
    ></iep-crud-table>
    <IepDialogRoleUserSelect ref="IepDialogRoleUserSelect" @load-page="loadPage()"></IepDialogRoleUserSelect>
    <IepDialogPermission ref="IepDialogPermission" @load-page="loadPage()"></IepDialogPermission>
  </div>
</template>
<script>
import { dictsMap, columnsMap } from "./options";
import {
  getOrgRolePage,
  permissionUpd,
  getOrgRoleUserListById,
  saveOrgRole,
} from "@/api/admin/role";
import { fetchRoleMenuTreeById, fetchRoleTree } from "@/api/admin/menu";
import { getOrgUserList } from "@/api/admin/org";
import { resolveAllEunuchNodeId } from "@/util/util";
import {} from "@/api/admin/role";
export default {
  data() {
    return {
      columnsMap,
      dictsMap,
      commonOptions: [
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
      ],
    };
  },
  methods: {
    getOrgRolePage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleGiveRole(row) {
      this.$refs.IepDialogRoleUserSelect.prefixUrl = "admin/role/org";
      this.$refs.IepDialogRoleUserSelect.获取该角色已有的用户列表方法 = getOrgRoleUserListById;
      this.$refs.IepDialogRoleUserSelect.保存该角色用户列表方法 = saveOrgRole;
      this.$refs.IepDialogRoleUserSelect.获取角色的所有用户列表方法 = getOrgUserList;
      this.$refs.IepDialogRoleUserSelect.roleId = row?.roleId;
      this.$refs.IepDialogRoleUserSelect.dialogShow = true;
    },
    async handlePermission(row) {
      const IepDialogPermission = this.$refs["IepDialogPermission"];
      IepDialogPermission.roleId = row.roleId;
      IepDialogPermission.title = row.roleName;
      IepDialogPermission.disabled = true;

      const res = await fetchRoleTree(row.roleId);
      const checkedKeys = res.data;

      const { data } = await fetchRoleMenuTreeById(row.roleId);
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
