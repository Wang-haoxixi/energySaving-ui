<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :useRoutePage="false"
      :columnsMap="columnsMap"
      :loadFunction="getDevOpsUserPage"
      searchName="realName"
    >
      <template #username="{scope}">
        <iep-popover-user-card :user-id="scope.row.userId">
          <iep-img class="iep-avatar-margin-right" :src="scope.row['avatar']" :resizeOpt="{l:40}"></iep-img>
        </iep-popover-user-card>
        <iep-div-detail :value="scope.row.username"></iep-div-detail>
      </template>
    </iep-crud-table>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
    <UserDialogForm ref="UserDialogForm" @load-page="loadPage()"></UserDialogForm>
  </div>
</template>
<script>
import { UserRoleDTO } from "./options";
import DialogForm from "./DialogForm";
import UserDialogForm from "./UserDialogForm";
import operationMixins from "@/mixins/operationMixins";
import {
  getDevOpsUserPage,
  delDevOpsUserById,
  getDevOpsUserById,
} from "@/api/admin/dev_ops";
export default {
  components: {
    DialogForm,
    UserDialogForm,
  },
  mixins: [operationMixins],
  data() {
    return {
      commonOptions: [
        {
          name: "新增运维",
          func: this.handleAdd,
        },
      ],
      operationOptions: [
        // {
        //   name: "编辑",
        //   func: this.handleEdit,
        // },
        {
          name: "移除",
          func: this.handleDel,
        },
      ],
      columnsMap: [
        {
          prop: "username",
          label: "用户名",
          type: "slot",
        },
        {
          prop: "realName",
          label: "真实姓名",
        },
      ],
    };
  },
  methods: {
    getDevOpsUserPage,
    handleAdd() {
      this.$refs["DialogForm"].dialogShow = true;
    },
    async handleEdit(row) {
      const { data } = await getDevOpsUserById(row.userId);
      this.$refs.UserDialogForm.form = this.$mergeByFirst(
        new UserRoleDTO(),
        data,
      );
      this.$refs.UserDialogForm.dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.userId, delDevOpsUserById, "移除用户");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
