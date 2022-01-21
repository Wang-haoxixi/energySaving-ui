<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      row-id="id"
      searchName="name"
      :loadFunction="getNameListPage"
      :useRoutePage="false"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
    </iep-crud-table>
    <form-dialog ref="formDialog" @load-page="loadPage()"></form-dialog>
  </div>
</template>
<script>
import { columnsMap, dictsMap } from "../options";
import operationMixins from "@/mixins/operationMixins";
import formDialog from "./formDialog";
import AdvanceSearch from "./AdvanceSearch";
import {
  getNameListPage,
  deletePageById,
  deleteMorePage,
  deleteMoreRealPage,
  getLockById,
  getReLockById,
  getLock,
  getReLock,
  getPersonExcelExport,
} from "@/api/dms/name_list";
export default {
  components: {
    formDialog,
    AdvanceSearch,
  },
  mixins: [operationMixins],
  data() {
    return {
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          name: "取消认证",
          func: this.handleMoreDelete,
          batchOperation: true,
        },
        {
          name: "删除",
          func: this.handleFalseDelete,
          batchOperation: true,
        },
        {
          name: "禁用",
          func: this.handleMoreLock,
          batchOperation: true,
        },
        {
          name: "启用",
          func: this.handleMoreReLock,
          batchOperation: true, // 如果批量就为 true
        },
        {
          name: "Excel导入",
          func: this.handleImport,
        },
        {
          name: "Excel导出",
          func: this.handleExport,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "禁用",
          func: this.handleLock,
          disabled: row => {
            return row.lockFlag === "1";
          },
        },
        {
          name: "启用",
          func: this.handleLock,
          disabled: row => {
            return row.lockFlag === "0";
          },
        },
      ],
      dictsMap,
      columnsMap,
      importDialogShow: false,
    };
  },
  methods: {
    getNameListPage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleAdd() {
      this.$router.push({
        path: "/btms/name_edit/0",
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: `/btms/name_edit/${row.id}`,
      });
    },
    handleDelete(row) {
      this._handleGlobalDeleteById(row.id, deletePageById);
    },
    handleMoreDelete() {
      this.$confirm("此操作将批量取消认证数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteMoreRealPage(this.multipleSelection).then(() => {
          this.loadPage();
        });
      });
    },
    handleFalseDelete() {
      this.$confirm("此操作将批量删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteMorePage(this.multipleSelection).then(() => {
          this.loadPage();
        });
      });
    },
    handleLock(row) {
      if (row.lockFlag === "1") {
        getReLockById(row.id).then(() => {
          this.loadPage();
        });
      }
      if (row.lockFlag === "0") {
        getLockById(row.id).then(() => {
          this.loadPage();
        });
      }
    },
    handleMoreLock() {
      this.$confirm("此操作将批量锁定这些数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        getLock(this.multipleSelection).then(() => {
          this.loadPage();
        });
      });
    },
    handleMoreReLock() {
      this.$confirm("此操作将批量解锁这些数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        getReLock(this.multipleSelection).then(() => {
          this.loadPage();
        });
      });
    },
    handleImport() {
      this.$refs["formDialog"].importDialogShow = true;
    },
    handleExport() {
      getPersonExcelExport(this.searchForm);
    },
  },
};
</script>>
