<template>
  <div style="width: 100%;">
    <iep-table
      :isLoadTable="false"
      :isPagination="false"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      isIndex
    >
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
    <el-button class="iep-btn-block add-btn" icon="el-icon-plus" @click="handleAdd()" plain>增加</el-button>
    <DialogRole ref="DialogRole" @load-page="loadPage()"></DialogRole>
    <IepDialogPermission ref="IepDialogPermission" @load-page="loadPage()"></IepDialogPermission>
  </div>
</template>
<script>
import DialogRole from "./DialogRole";
import {
  getAppRoleList,
  postAppRole,
  putAppRole,
  delAppRoleById,
  permissionAppUpd,
} from "@/api/admin/role";
import { fetchNoSysMenuTree, fetchRoleTree } from "@/api/admin/menu";
import operationMixins from "@/mixins/operationMixins";
import { resolveAllEunuchNodeId } from "@/util/util";
export default {
  mixins: [operationMixins],
  components: {
    DialogRole,
  },
  data() {
    return {
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "配置",
          func: this.handlePermission,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      pagedTable: [],
      columnsMap: [
        {
          prop: "roleName",
          label: "名称",
        },
        {
          prop: "roleDesc",
          label: "描述",
        },
        {
          prop: "updateTime",
          label: "更新时间",
        },
      ],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleEdit(row) {
      this.$refs.DialogRole.form = { ...row };
      this.$refs.DialogRole.methodName = "编辑";
      this.$refs.DialogRole.formRequestFn = putAppRole;
      this.$refs.DialogRole.dialogShow = true;
    },
    handleAdd() {
      this.$refs.DialogRole.load(this.$route.params.id);
      this.$refs.DialogRole.methodName = "新增";
      this.$refs.DialogRole.formRequestFn = postAppRole;
      this.$refs.DialogRole.dialogShow = true;
    },
    async handlePermission(row) {
      const IepDialogPermission = this.$refs["IepDialogPermission"];
      IepDialogPermission.roleId = row.roleId;
      IepDialogPermission.title = row.roleName;

      const res = await fetchRoleTree(row.roleId);
      const checkedKeys = res.data;

      const { data } = await fetchNoSysMenuTree();
      IepDialogPermission.treeData = data;
      // 解析出所有的节点
      IepDialogPermission.checkedKeys = resolveAllEunuchNodeId(
        data,
        checkedKeys,
        [],
      );

      IepDialogPermission.formRequestFn = permissionAppUpd;
      IepDialogPermission.dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.roleId, delAppRoleById, "删除");
    },
    async loadPage() {
      const { data } = await getAppRoleList(this.$route.params.id);
      this.pagedTable = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.add-btn {
  border-color: $--border-color;
}
</style>