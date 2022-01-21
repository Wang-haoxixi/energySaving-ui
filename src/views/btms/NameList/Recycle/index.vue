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
      :loadFunction="pageRecycleList"
      :useRoutePage="false"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
    </iep-crud-table>
  </div>
</template>>
<script>
import { columnsRecyclegMap, dictsMap } from "../options";
import operationMixins from "@/mixins/operationMixins";
import AdvanceSearch from "../Whole/AdvanceSearch";
import {
  pageRecycleList,
  deleteRealPageById,
  recoveryById,
  deleteMoreRealPage,
} from "@/api/dms/name_list";

export default {
  components: { AdvanceSearch },
  mixins: [operationMixins],
  data() {
    return {
      dictsMap,
      columnsMap: columnsRecyclegMap,
      commonOptions: [
        {
          name: "删除",
          func: this.handleRealDelete,
          batchOperation: true,
        },
      ],
      operationOptions: [
        {
          name: "撤销",
          func: this.handleRecovery,
        },
        {
          name: "删除",
          func: this.handleRealDelete,
        },
      ],
    };
  },
  methods: {
    pageRecycleList,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleRealDelete(row) {
      this._handleComfirm(row.id, deleteRealPageById, "删除人名信息");
    },
    handleRecovery(row) {
      recoveryById(row.id).then(data => {
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
    handleMoreDelete() {
      deleteMoreRealPage(this.multipleSelection).then(() => {
        this.loadPage();
      });
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
