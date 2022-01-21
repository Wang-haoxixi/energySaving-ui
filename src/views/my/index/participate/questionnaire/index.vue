<template>
  <div>
    <iep-operation-container>
      <template slot="right">
        <iep-table-density></iep-table-density>
        <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
        <iep-operation-search @search-page="searchPage" :paramForm="searchForm" prop="name"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template #status="{scope}">{{dictsMap.status[scope.row.status] || "暂无"}}</template>
      <template #startTime="{scope}">{{scope.row.startTime | parseToDay}}</template>
      <template #endTime="{scope}">{{scope.row.endTime | parseToDay}}</template>
      <el-table-column prop="operation" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="handleAnalysis(scope.row)">分析报告</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <!-- 分析报告 -->
    <dialog-analysis ref="dialogAnalysis"></dialog-analysis>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { tableOption } from "./option";
import { dictsMap } from "@/views/qms/questionnaire/manage/const/options";
import DialogAnalysis from "@/views/qms/questionnaire/manage/dialog/analysis/dialog";
import { mapGetters } from "vuex";
// 正式接口
import { getParticipatePage } from "@/api/qms/questionnaire";

export default {
  name: "quesTable",
  mixins: [mixins, operationMixins],
  components: {
    DialogAnalysis,
  },
  data() {
    return {
      columnsMap: tableOption,
      dictsMap,
      type: "",
      isRoute: true,
    };
  },
  methods: {
    async loadPage(params = this.searchForm) {
      await this.loadTable({ ...params }, getParticipatePage);
    },
    handleAnalysis({ id, name }) {
      //打开分析报告dialog
      this.$nextTick(() => {
        this.$refs.dialogAnalysis.open({ id, name });
      });
    },
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
};
</script>
