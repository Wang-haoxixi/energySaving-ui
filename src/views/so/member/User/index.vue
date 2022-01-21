<template>
  <div>
    <div class="dept-user-wrapper">
      <!-- <dept-tree-aside class="dept-wrapper" ref="DeptTreeAside"></dept-tree-aside> -->
      <iep-crud-table
        class="user-wrapper iep-basic-scroll"
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="userId"
        searchName="realName"
        :loadFunction="getOrgUserPage"
        :isMutipleSelection="false"
      >
        <template #iep-crud-left>
          <iep-operation-wrapper>
            <el-button type="primary" icon="el-icon-plus" @click="handleAddAdmin()">新增管理员</el-button>
            <iep-button @click="inviteSoUser()">邀请用户</iep-button>
          </iep-operation-wrapper>
        </template>
        <template #realName="{scope}">
          <iep-popover-user-card :user-id="scope.row.userId">
            <iep-img class="iep-avatar-margin-right" :resizeOpt="{l:40}" :src="scope.row.avatar"></iep-img>
          </iep-popover-user-card>
          <iep-div-detail :value="scope.row.realName"></iep-div-detail>
        </template>
      </iep-crud-table>
    </div>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
    <add-admin-dialog ref="AddAdminDialog" @load-page="loadPage()"></add-admin-dialog>
    <review-dialog-form ref="ReviewDialogForm" @load-page="loadPage()"></review-dialog-form>
    <iep-review-confirm ref="IepReviewForm" @load-page="loadPage()" :is-content="false"></iep-review-confirm>
    <IepDialogInviteSoUser ref="IepDialogInviteSoUser"></IepDialogInviteSoUser>
    <role-dialog-form ref="RoleDialogForm" @load-page="loadPage()"></role-dialog-form>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import ReviewDialogForm from "./ReviewDialogForm.vue";
import AddAdminDialog from "./AddAdminDialog.vue";
import RoleDialogForm from "./RoleDialogForm.vue";
// import DeptTreeAside from "./DeptTreeAside";
import { dictsMap, columnsMap, initForm } from "./options";
import { putUser } from "@/api/admin/user";
import { saveOrgRole } from "@/api/admin/role";
import {
  getOrgUserPage,
  orgPassUserJoins,
  fireUserById,
} from "@/api/admin/org";
import { mapGetters } from "vuex";
export default {
  components: {
    DialogForm,
    ReviewDialogForm,
    AddAdminDialog,
    RoleDialogForm,
    // DeptTreeAside,
  },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      dictsMap,
      operationOptions: [
        {
          name: "审核",
          func: this.handleReview,
          hidden: (row) => {
            // 如果待审核
            return row.status === "0";
          },
        },
        // TODO: 等待完成
        // {
        //   name: "编辑",
        //   func: this.handleEdit,
        // },
        {
          name: "编辑",
          func: this.handleEditRole,
        },
        {
          name: "移除",
          func: this.handleDel,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getOrgUserPage,
    inviteSoUser() {
      this.$refs["IepDialogInviteSoUser"].form = {
        orgId: this.userInfo.orgId,
        orgName: this.userInfo.orgName,
        users: [],
      };
      this.$refs["IepDialogInviteSoUser"].dialogShow = true;
    },
    handleAddAdmin() {
      this.$refs["AddAdminDialog"].dialogShow = true;
    },
    handleReview(row) {
      this.$refs["ReviewDialogForm"].userId = row.userId;
      this.$refs["ReviewDialogForm"].message = row.message;
      this.$refs["ReviewDialogForm"].dialogShow = true;
    },
    handleReviewBatch() {
      this.$refs["IepReviewForm"].ids =
        this.$refs["CrudTable"].multipleSelection;
      this.$refs["IepReviewForm"].title = "批量审核";
      this.$refs["IepReviewForm"].formRequestFn = orgPassUserJoins;
      this.$refs["IepReviewForm"].dialogShow = true;
    },
    async handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), row);
      // this.$refs["DialogForm"].form.roleIds = data.roleList.map(m => m.roleId);
      this.$refs["DialogForm"].formRequestFn = putUser;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(
        row.userId,
        fireUserById(this.userInfo.orgId),
        "移除",
        `是否确认将 ${row.realName} 移出 ${this.userInfo.orgName}`,
      );
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
      // this.$refs["DeptTreeAside"].load();
    },
    handleEditRole(row) {
      this.$refs["RoleDialogForm"].form.userId = row.userId;
      this.$refs["RoleDialogForm"].form.roleIds = row.roleList.map(
        (m) => m.roleId,
      );
      this.$refs["RoleDialogForm"].methodName = "编辑";
      this.$refs["RoleDialogForm"].formRequestFn = saveOrgRole;
      this.$refs["RoleDialogForm"].dialogShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.dept-user-wrapper {
  display: flex;
  .dept-wrapper {
    flex: 0 0 200px;
  }
  .user-wrapper {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
  }
}
</style>
