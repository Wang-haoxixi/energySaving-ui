<template>
  <!-- 事项认领 -->
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <IepPageHeader title="事项认领" @row-click="onRowClick"></IepPageHeader>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          border
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <el-table-column prop="operation" label="操作" width="240" fixed="right">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
                <el-button type="text" @click="handleClaim(scope.row)">认领</el-button>
                <el-button type="text" @click="handleStatistics(scope.row)">统计</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
    <StatisticsDialog ref="statisticsDialog" />
  </div>
</template>
<script>
import currentMixin from "./const/mixin";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import StatisticsDialog from "./statisticsDialog";
export default {
  mixins: [currentMixin],
  components: {
    FormTpl,
    StatisticsDialog,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    // 事项点击事件
    onRowClick(row) {
      console.log("事项点击事件", row);
    },
    // 表单与页面也换
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>