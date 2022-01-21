<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      row-id="orgId"
      searchName="name"
      :loadFunction="getPage"
      :useRoutePage="false"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
    </iep-crud-table>
    <form-dialog ref="formDialog" @load-page="loadPage"></form-dialog>
  </div>
</template>
<script>
import { columnsPendingMap, dictsMap, initSearchForm } from "../options";
import AdvanceSearch from "./AdvanceSearch";
import formDialog from "./formDialog";
import { getPage, deletePage, getforbide } from "@/api/dms/organization_list";
// import { mapGetters } from "vuex";
export default {
  components: { AdvanceSearch, formDialog },
  data() {
    return {
      dictsMap,
      columnsMap: columnsPendingMap,
      orgId: [],
      searchForm: initSearchForm(),
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          name: "删除",
          func: this.handleMoreDelete,
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
          batchOperation: true,
        },
        {
          name: "Excel导入",
          func: this.handleImport,
        },
        // {
        //   name: "导出",
        //   func: this.handleExport,
        // },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDelete,
        },
        {
          name: "禁用",
          func: this.handleLockOrReLock,
          disabled: row => {
            return row.isForbidden === "1";
          },
        },
        {
          name: "启用",
          func: this.handleLockOrReLock,
          disabled: row => {
            return row.isForbidden === "0";
          },
        },
      ],
    };
  },
  methods: {
    getPage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleAdd() {
      this.$router.push({
        path: "/btms/mech_edit/0",
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: `/btms/mech_edit/${row.orgId}`,
      });
    },
    handleMoreLock() {
      getforbide({ set: 1, ids: this.multipleSelection }).then(() => {
        this.loadPage();
      });
    },
    handleMoreReLock() {
      getforbide({ set: 0, ids: this.multipleSelection }).then(() => {
        this.loadPage();
      });
    },
    handleLockOrReLock(row) {
      if (row.isForbidden === "0") {
        getforbide({ set: 1, ids: [row.orgId] }).then(() => {
          this.loadPage();
        });
      }
      if (row.isForbidden === "1") {
        getforbide({ set: 0, ids: [row.orgId] }).then(() => {
          this.loadPage();
        });
      }
    },
    handleDelete(row) {
      this.orgId = [row.orgId];
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deletePage(this.orgId).then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: `删除失败，${res.msg}`,
            });
          }
          this.loadPage();
        });
      });
    },
    handleMoreDelete() {
      deletePage(this.multipleSelection).then(() => {
        this.loadPage();
      });
    },
    handleImport() {
      this.$refs["formDialog"].importFlag = true;
      this.$refs["formDialog"].importDialogShow = true;
    },
    handleExport() {
      this.$refs["formDialog"].parmasForm = this.searchForm;
      this.$refs["formDialog"].importFlag = false;
      this.$refs["formDialog"].importDialogShow = true;
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
}
.main-name {
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
