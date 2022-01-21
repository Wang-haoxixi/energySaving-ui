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
    <dialog-form ref="DialogForm"></dialog-form>
  </div>
</template>>
<script>
import { columnsPendingMap, dictsMap } from "../options";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm";
import AdvanceSearch from "./AdvanceSearch";
import { getPage, applyPass, deletePage } from "@/api/dms/organization_list";
// import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  components: { AdvanceSearch, DialogForm },
  data() {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap: columnsPendingMap,
      multipleSelection: [],
      commonOptions: [
        {
          name: "审核",
          func: this.handleApply,
          batchOperation: true,
        },
        {
          name: "删除",
          func: this.handleMoreDelete,
        },
      ],
      operationOptions: [
        {
          name: "审核",
          func: this.handleClaim,
        },
      ],
    };
  },
  methods: {
    getPage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    selectionChange(val) {
      this.multipleSelection = val.map(m => m.orgId);
    },
    handleApply() {
      this.$confirm("此操作将批量认证该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        applyPass(this.multipleSelection).then(res => {
          if (res.data.data) {
            this.$message({
              type: "success",
              message: "认证成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: `认证失败，${res.data.msg}`,
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
    handleClaim(row) {
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].id = row.orgId;
      this.$refs["DialogForm"].loadPage();
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>>
<style lang="scss" scoped>
.box {
  display: flex;
}
.main-name {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
}
.claim {
  color: #cf3f26;
  font-size: 16px;
}
</style>
