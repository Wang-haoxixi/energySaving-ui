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
        :loadFunction="getPayConfigPage"
        :isMutipleSelection="false"
      >
        <template #enable="{scope}">
          <span>{{dictMap.enable[scope.row.enable]}}</span>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import {
  getPayConfigPage,
  putPayConfig,
  delPayConfiglById,
  postPayConfig,
} from "@/api/fms/pay_config";
import { columnsMap, initForm, dictMap } from "./options";
import { hasPermissions } from "@/util/menu";

export default {
  components: {
    DialogForm,
  },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      dictMap,
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
    getPayConfigPage,
    handleAdd() {
      this.$refs["DialogForm"].form = initForm();
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = postPayConfig;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), row);
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = putPayConfig;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, delPayConfiglById, "删除支付配置");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
