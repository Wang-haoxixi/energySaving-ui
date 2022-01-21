<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table ref="CrudTable" :dictsMap="dictsMap" :commonOptions="commonOptions" :operationOptions="operationOptions" :columnsMap="columnsMap" searchName="publicName" rowId="id" :loadFunction="getParamPage" :isMutipleSelection="false">
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <DialogForm ref="DialogForm" @load-page="loadPage"></DialogForm>
  </div>
</template>
<script>
import DialogForm from "./DialogForm.vue";
import AdvanceSearch from "./AdvanceSearch";
import { columnsMap, dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import {
  getParamPage,
  postParam,
  putParam,
  deleteParam,
} from "@/api/admin/param";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
    AdvanceSearch,
  },
  data() {
    return {
      columnsMap,
      dictsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
    };
  },
  methods: {
    getParamPage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleAdd() {
      this.$refs["DialogForm"].formRequestFn = postParam;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = { ...row };
      this.$refs["DialogForm"].formRequestFn = putParam;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.publicId, deleteParam, "删除");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
