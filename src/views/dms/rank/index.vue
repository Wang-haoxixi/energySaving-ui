<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
        </template>
      </iep-operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap, initMemberForm } from "./option";
import {
  getProxyConfigPage,
  createProxyConfig,
  putProxyConfig,
  deleteProxyConfigById,
} from "@/api/dms/proxy";
import DialogForm from "./DialogForm";

export default {
  mixins: [mixins, operationMixins],
  components: { DialogForm },
  data() {
    return {
      columnsMap,
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
  created() {
    this.loadPage();
  },
  methods: {
    loadPage(param = this.searchForm) {
      this.loadTable({ ...param }, getProxyConfigPage);
    },
    handleAdd() {
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = createProxyConfig;
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].disEdit = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initMemberForm(), row);
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].rankId = row.rankId;
      this.$refs["DialogForm"].formRequestFn = putProxyConfig;
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].disEdit = true;
    },
    handleDel(val) {
      this._handleComfirm(val.rankId, deleteProxyConfigById, "删除");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  height: 36px;
  border-radius: 10px;
}
.btn-groups ::v-deep .el-button {
  margin-right: 0;
}
</style>
