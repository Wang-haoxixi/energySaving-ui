<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table ref="CrudTable" :commonOptions="commonOptions" :operationOptions="operationOptions" :columnsMap="columnsMap" row-id="id" searchName="name" :loadFunction="getVersionPage">
      </iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { initForm } from "./options";
import DialogForm from "./DialogForm";
import operationMixins from "@/mixins/operationMixins";
import {
  getVersionPage,
  postVersion,
  putVersion,
  deleteVersionById,
} from "@/api/dms/version";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      columnsMap: [
        {
          prop: "versionTitle",
          label: "标题",
        },
        {
          prop: "versionNumber",
          label: "版本号",
          width: 100,
        },
        {
          prop: "publisherName",
          label: "发布人",
          width: 100,
        },
        {
          prop: "createTime",
          label: "发布时间",
          width: 150,
        },
      ],
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
          hidden: false,
          disabled: false,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: false,
          disabled: false,
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: false,
          disabled: false,
        },
      ],
    };
  },
  methods: {
    getVersionPage,
    handleAdd() {
      this.$refs["DialogForm"].form = initForm();
      this.$refs["DialogForm"].methodName = "新增";
      this.$refs["DialogForm"].formRequestFn = postVersion;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), row);
      this.$refs["DialogForm"].methodName = "修改";
      this.$refs["DialogForm"].formRequestFn = putVersion;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDelete(row) {
      this._handleComfirm(row.id, deleteVersionById, "删除");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
