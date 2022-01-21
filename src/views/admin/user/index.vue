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
        row-id="userId"
        searchName="realName"
        :loadFunction="getUserPage"
      >
        <template #username="{scope}">
          <iep-popover-user-card :user-id="scope.row.userId">
            <iep-img class="iep-avatar-margin-right" :src="scope.row['avatar']" :resizeOpt="{l:40}"></iep-img>
          </iep-popover-user-card>
          <iep-div-detail :value="scope.row.username"></iep-div-detail>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import { dictsMap, columnsMap } from "./options";
import { getUserPage, delUserById } from "@/api/admin/user";
import { saveSysRole } from "@/api/admin/role";
import { hasPermissions } from "@/util/menu";
export default {
  components: {
    DialogForm,
  },
  mixins: [operationMixins],
  data() {
    return {
      checkList: [],
      columnsMap,
      dictsMap,
      commonOptions: [
        // {
        //   icon: "el-icon-plus",
        //   name: "新增",
        //   func: this.handleAdd,
        //   hidden: !hasPermissions("sys_user_add"),
        // },
        {
          name: "批量导出",
          func: () => {},
          batchOperation: true,
        },
        {
          name: "批量删除",
          func: () => {},
          batchOperation: true,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: !hasPermissions("sys_user_edit"),
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: !hasPermissions("sys_user_del"),
        },
      ],
    };
  },
  methods: {
    getUserPage,
    // handleAdd() {
    //   this.$refs["DialogForm"].form = new UserEntity();
    //   this.$refs["DialogForm"].methodName = "添加";
    //   this.$refs["DialogForm"].formRequestFn = postUser;
    //   this.$refs["DialogForm"].dialogShow = true;
    // },
    handleEdit(row) {
      this.$refs["DialogForm"].form.userId = row.userId;
      this.$refs["DialogForm"].form.roleIds = row.roleList.map((m) => m.roleId);
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = saveSysRole;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.userId, delUserById, "删除用户");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
