<template>
  <iep-basic-container>
    <iep-page-header title="通知模板管理"></iep-page-header>
    <iep-operation-container class="operation-container">
      <template slot="left">
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      </template>
      <template slot="right">
        <SearchForm @searchPage="searchPage"></SearchForm>
      </template>
    </iep-operation-container>
    <div class="content">
      <iep-table
        :dictsMap="dictsMap"
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="ColumnsMaps"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <iep-operation-table-btn-group :width="140" :options="personalOperationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </div>
    <!-- 表单 -->
    <FormDialog ref="form" @back-page="loadPage()"></FormDialog>
  </iep-basic-container>
</template>

<script>
import operationMixins from "@/mixins/operationMixins";
import mixins from "@/mixins/mixins";
import SearchForm from "./searchForm";
import { mapGetters } from "vuex";
import { ColumnsMaps, dictsMap } from "./options";
import FormDialog from "./formDialog";
import { getMailPage, deleteMail } from "@/api/dms/recruit";

export default {
  mixins: [operationMixins, mixins],
  components: { SearchForm, FormDialog },
  data() {
    return {
      ColumnsMaps,
      dictsMap,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    personalOperationOptions() {
      return [
        {
          name: "编辑",
          func: this.handleUpdate,
          hidden: false,
        },
        {
          name: "删除",
          func: this.handleDelete,
          hidden: false,
        },
      ];
    },
  },
  methods: {
    loadPage(params = this.queryForm) {
      this.isLoadTable = false;
      this.loadTable(params, getMailPage);
    },
    handleCreate() {
      this.$refs.form.open();
    },
    handleUpdate(row) {
      this.$refs.form.open(row);
    },
    handleDelete(row) {
      this._handleComfirm([row.id], deleteMail, "删除此条模板");
    },
  },
  created() {
    this.queryForm.orgId = this.userInfo.orgId;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
</style>
