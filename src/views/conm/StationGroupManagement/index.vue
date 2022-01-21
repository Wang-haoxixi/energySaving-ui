<template>
  <iep-basic-container>
    <div class="station-group">
      <iep-page-header title="站群管理" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <el-button
            v-if="info_site_add"
            type="primary"
            @click="handleAdd"
            icon="el-icon-plus"
            class="button"
          >新增</el-button>
        </template>
      </iep-operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
        is-mutiple-selection
      >
        <template slot="before-columns">
          <el-table-column label="ID" width="90px">
            <template slot-scope="scope">
              <div>{{ scope.row.id }}</div>
            </template>
          </el-table-column>
          <el-table-column label="站名">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">
                {{
                scope.row.siteName
                }}
              </iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="info_site_edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button v-if="info_site_del" type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </iep-table>
      <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    </div>
  </iep-basic-container>
</template>
<script>
import {
  getStationManagementPage,
  postStationManagementCreate,
  deleteStationManagement,
  updateStationManagement,
} from "@/api/conm/index.ts";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap, initSearchForm, dictsMap } from "./options.ts";
import DialogForm from "./DialogForm";
// import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
export default {
  mixins: [mixins, operationMixins],
  components: { DialogForm },
  data() {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      statistics: [0],
      replaceText: data => `（共${data[0]}条）`,
      pagedTable: [],
    };
  },
  created() {
    this.loadPage();
  },
  computed: {
    info_site_add: () => hasPermissions("info_site_add"),
    info_site_edit: () => hasPermissions("info_site_edit"),
    info_site_del: () => hasPermissions("info_site_del"),
  },
  methods: {
    handleAdd() {
      this.$refs["DialogForm"].formRequestFn = postStationManagementCreate;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "新增";
    },
    handleEdit(row) {
      this.$refs["DialogForm"].id = row.id;
      this.$refs["DialogForm"].formRequestFn = updateStationManagement;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].methodName = "编辑";
    },
    handleDetail(row) {
      this.$router.push({
        path: `/conm/station_management_detail/${row.id}`,
      });
    },
    handleDelete(row) {
      this._handleComfirm(row.id, deleteStationManagement, "删除站点");
    },
    async loadPage(param = this.searchForm) {
      const data = await this.loadTable(param, getStationManagementPage);
      this.$set(this.statistics, 0, data.total);
    },
  },
};
</script>
<style lang="scss" scoped>
.button {
  height: 36px;
  border-radius: 10px;
}
@import "../common.scss";
.station-group ::v-deep .el-link--inner {
  font-size: 12px;
}
</style>
