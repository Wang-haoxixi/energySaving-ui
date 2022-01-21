<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        searchName="type"
        rowId="id"
        :loadFunction="getSocialPage"
        :isMutipleSelection="false"
      ></iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import {
  getSocialPage,
  putSocial,
  delSocialById,
  postSocial,
} from "@/api/admin/social";
import { columnsMap, initForm } from "./options";
import { hasPermissions } from "@/util/menu";

export default {
  components: {
    DialogForm,
  },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
          hidden: !hasPermissions("sys_social_details_add"),
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: !hasPermissions("sys_social_details_edit"),
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: !hasPermissions("sys_social_details_del"),
        },
      ],
    };
  },
  methods: {
    getSocialPage,
    handleAdd() {
      this.$refs["DialogForm"].form = initForm();
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = postSocial;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), row);
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = putSocial;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, delSocialById, "删除密钥");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
