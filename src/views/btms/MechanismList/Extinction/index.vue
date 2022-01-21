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
      :loadFunction="getRecyclePage"
      :useRoutePage="false"
      :usePrimary="false"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
    </iep-crud-table>
  </div>
</template>>
<script>
import { columnsPendingMap, dictsMap } from "../options";
import AdvanceSearch from "../List/AdvanceSearch";
import {
  getRecyclePage,
  deleteRecyclePage,
  recoverRecyclePage,
} from "@/api/dms/organization_list.ts";
// import { mapGetters } from "vuex";
export default {
  components: { AdvanceSearch },
  data() {
    return {
      dictsMap,
      columnsMap: columnsPendingMap,
      commonOptions: [
        {
          name: "删除",
          func: this.handleMoreDelete,
          batchOperation: true,
        },
      ],
      operationOptions: [
        {
          name: "撤销",
          func: this.handleRecover,
        },
        {
          name: "删除",
          func: this.handleDelete,
        },
      ],
    };
  },
  methods: {
    getRecyclePage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    selectionChange(val) {
      this.multipleSelection = val.map(m => m.orgId);
    },
    handleMoreDelete() {
      deleteRecyclePage(this.multipleSelection).then(() => {
        this.loadPage();
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteRecyclePage([row.orgId]).then(() => {
          this.loadPage();
        });
      });
    },
    handleRecover(row) {
      recoverRecyclePage([row.orgId]).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: "撤销成功",
            type: "success",
          });
          this.loadPage();
        } else {
          this.$message(data.msg);
        }
      });
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
