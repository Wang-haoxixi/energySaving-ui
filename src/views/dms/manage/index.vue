<template>
  <div class="dms-manage">
    <iep-basic-container>
      <iep-operation-container>
        <template slot="left">
          <iep-page-header :title="$route.meta.name" :replaceText="replaceText" :data="statistics"></iep-page-header>
        </template>
        <template slot="right">
          <iep-operation-search @search-page="searchPage" placeholder="请输入代理商名称" prop="objectName"></iep-operation-search>
        </template>
      </iep-operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <iep-operation-wrapper>
              <el-button type="text" @click.native="handleDetail(scope.row)">查看</el-button>
            </iep-operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </iep-basic-container>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { columnsMap, dictsMap } from "./option";
import { getProxyManagementPage, getIndividual } from "@/api/dms/proxy";
// import AdvanceSearch from "./AdvanceSearch";

export default {
  mixins: [mixins],
  data() {
    return {
      columnsMap,
      dictsMap,
      replaceText: data => `（合伙人共计：${data[0]}人）`,
      statistics: [0],
    };
  },
  created() {
    this.loadPage();
    getIndividual().then(res => {
      this.statistics = [res];
    });
  },
  methods: {
    loadPage(param = this.searchForm) {
      this.loadTable({ ...param }, getProxyManagementPage);
    },
    handleDetail(row) {
      this.$router.push({
        path: `/dms/detail/${row.agentId}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  margin-right: 0;
}
.dms-manage ::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>
