<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        rowId="dictId"
        :isCrudSearch="permissionGuard.permission"
        :loadFunction="getDictPage"
      >
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
    <config-form ref="ConfigForm" @load-page="loadPage()"></config-form>
  </div>
</template>

<script>
import {
  postDict,
  delDictById,
  getDictPage,
  putDict,
  getDictPageForPermission,
} from "@/api/admin/dict";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm";
import ConfigForm from "./ConfigForm";
import AdvanceSearch from "./AdvanceSearch";
import { columnsMap, initForm } from "./options";
import { hasPermissions } from "@/util/menu";

export default {
  components: { DialogForm, ConfigForm, AdvanceSearch },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: this.sys_dict_edit,
        },
        {
          name: "字典配置",
          func: this.handleConfig,
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: this.sys_dict_del,
        },
      ],
    };
  },
  computed: {
    sys_dict_add: () => hasPermissions("sys_dict_add"),
    sys_dict_edit: () => hasPermissions("sys_dict_edit"),
    sys_dict_del: () => hasPermissions("sys_dict_del"),
    permissionGuard() {
      const sufferStr = this.$route.matched[1].path;
      const sSlength = sufferStr.split("/").length - 1;
      const needStr = sufferStr.split("/")[sSlength];
      if (needStr !== "dict") {
        return {
          permission: false,
          dictCode: needStr,
        };
      }
      return {
        permission: true,
        dictCode: "",
      };
    },
    commonOptions() {
      return [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
          hidden: this.sys_dict_add && !this.permissionGuard.permission,
        },
      ];
    },
    /**
     * 如果不是超管, 进入该页面只会通过路径后缀判断其需要的字典
     */
    getDictPage() {
      if (this.permissionGuard.permission) {
        return getDictPage;
      } else {
        return getDictPageForPermission(this.permissionGuard.dictCode);
      }
    },
  },
  methods: {
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleAdd() {
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = postDict;
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), row);
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = putDict;
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleConfig(row) {
      this.$refs["ConfigForm"].id = row.id;
      this.$refs["ConfigForm"].dialogShow = true;
      this.$refs["ConfigForm"].loadPage();
    },
    handleDel(row) {
      this._handleComfirm(row.id, delDictById, "删除字典");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
