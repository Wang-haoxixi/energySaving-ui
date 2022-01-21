<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        rowId="roleId"
        :loadFunction="getRolePage"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
    <IepDialogPermission ref="IepDialogPermission" @load-page="loadPage()"></IepDialogPermission>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import { dictsMap, columnsMap, initForm } from "./options";
import {
  getRolePage,
  putRole,
  delRoleById,
  postRole,
  permissionUpd,
} from "@/api/admin/role";
import { hasPermissions } from "@/util/menu";
import { resolveAllEunuchNodeId } from "@/util/util";
import { fetchMenuTree, fetchRoleTree } from "@/api/admin/menu";
export default {
  components: {
    DialogForm,
    AdvanceSearch,
  },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      dictsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
          hidden: !hasPermissions("sys_role_add"),
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: !hasPermissions("sys_role_edit"),
        },
        {
          name: "授权",
          func: this.handlePermission,
          hidden: !hasPermissions("sys_role_perm"),
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: !hasPermissions("sys_role_del"),
        },
      ],
    };
  },
  methods: {
    getRolePage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleAdd() {
      this.$refs["DialogForm"].form = initForm();
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = postRole;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), row);
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = putRole;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.roleId, delRoleById, "删除角色");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    async handlePermission(row) {
      const IepDialogPermission = this.$refs["IepDialogPermission"];
      IepDialogPermission.roleId = row.roleId;
      IepDialogPermission.title = row.roleName;

      const res = await fetchRoleTree(row.roleId);
      const checkedKeys = res.data;

      const { data } = await fetchMenuTree();
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
