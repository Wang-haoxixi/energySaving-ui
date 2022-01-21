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
        row-id="id"
        searchName="name"
        :loadFunction="getPage"
        :useRoutePage="false"
      ></iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-son-form ref="DialogSonForm" @load-page="loadPage"></dialog-son-form>
    <form-dialog ref="formDialog" @load-page="loadPage"></form-dialog>
  </div>
</template>

<script>
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm";
import DialogSonForm from "./DialogSonForm";
import { columnsMap, dictsMap } from "./options";
import formDialog from "./formDialog";
import {
  deleteByList,
  getPageBySon,
  getPage,
  createPage,
  updatePage,
} from "@/api/dms/position";
export default {
  mixins: [operationMixins],
  components: { DialogForm, DialogSonForm, formDialog },
  data() {
    return {
      dictsMap,
      columnsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          icon: "el-icon-delete",
          name: "批量删除",
          func: this.handleMoreDelete,
          batchOperation: true,
        },
        {
          name: "导入",
          func: this.handleImport,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "子分类",
          func: this.handleSonType,
        },
        {
          name: "删除",
          func: this.handleDelete,
        },
      ],
    };
  },
  methods: {
    getPage,
    handleAdd() {
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "新增";
      this.$refs["DialogForm"].getValueByKey();
      this.$refs["DialogForm"].formRequestFn = createPage;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].id = row.id;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].parentId = row.parentId;
      this.$refs["DialogForm"].formRequestFn = updatePage;
    },
    handleSonType(row) {
      this.$refs["DialogSonForm"].dialogShow = true;
      this.$refs["DialogSonForm"].formRequestFn = getPageBySon;
      this.$refs["DialogSonForm"].id = row.id;
      this.$refs["DialogSonForm"].loadPage();
    },
    handleImport() {
      this.$refs["formDialog"].importFlag = true;
      this.$refs["formDialog"].importDialogShow = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将删除该项及其子分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteByList([row.id]).then(() => {
          this.loadPage();
        });
      });
    },
    handleMoreDelete() {
      const multipleSelection = this.$refs["CrudTable"]["multipleSelection"];
      if (multipleSelection.length !== 0) {
        this.$confirm("此操作将删除该项及其子分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          deleteByList(multipleSelection).then(() => {
            this.loadPage();
          });
        });
      }
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
