<template>
  <full-screen-dialog ref="fullScreenDialog">
    <template slot="main">
      <div class="questionnaire-filling">
        <!-- <iep-basic-container> -->
        <iep-operation-container>
          <template slot="left">
            <iep-page-header :title="$route.meta.name"></iep-page-header>
          </template>
          <template slot="right">
            <iep-operation-search @search-page="searchPage" :paramForm="searchForm" prop="name">
              <advance-search @search-page="searchPage"></advance-search>
            </iep-operation-search>
          </template>
        </iep-operation-container>
        <iep-table
          ref="CrudTable"
          :isLoadTable="isLoadTable"
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
          :dictsMap="dictsMap"
        >
          <template #scope="{scope}">{{dictsMap.scope[scope.row.scope] || "暂无"}}</template>
          <template #status="{scope}">{{dictsMap.status[scope.row.status] || "暂无"}}</template>
          <template
            #startTime="{scope}"
          >{{scope.row.timeSetting===2&&scope.row.startTime | parseToTimeMinutes}}</template>
          <template
            #endTime="{scope}"
          >{{scope.row.timeSetting===2&&scope.row.endTime | parseToTimeMinutes}}</template>
          <template
            #joinPeople="{scope}"
          >{{ (scope.row.status === '2' || scope.row.status === '4' || scope.row.status === '5') ? '暂无' : scope.row.joinPeople}}</template>
          <iep-operation-table-btn-group :options="operationOptions" :width="150"></iep-operation-table-btn-group>
        </iep-table>
        <!-- </iep-basic-container> -->
      </div>
    </template>
    <template slot="form">
      <dialog-analysis
        ref="dialogAnalysis"
        v-if="type === 'analysis'"
        @close="closeFullScreenDialog"
      ></dialog-analysis>
    </template>
  </full-screen-dialog>
</template>
<script>
import FullScreenDialog from "../components/fullScreenDialog";
import AdvanceSearch from "./components/advanceSearch";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap } from "./const/options";
import { dictsMap } from "../manage/const/options";
import mixins from "@/mixins/mixins";
import { getSoPage } from "@/api/qms/questionnaire";
import DialogAnalysis from "../manage/dialog/analysis/index";
import currentMixin from "../manage/mixins/index";

export default {
  mixins: [operationMixins, mixins, currentMixin],
  components: {
    AdvanceSearch,
    DialogAnalysis,
    FullScreenDialog,
  },
  data() {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [],
      type: "",
      form: {},
      isRoute: true,
    };
  },
  computed: {
    operationOptions() {
      return [
        {
          name: "开始答卷",
          func: this.handleTo,
          type: "to",
          hidden: row => {
            if (row.participate === "2") {
              return true;
            }
            return row.status === "3" || row.status === "6";
          },
        },
        {
          name: "分析报告",
          func: this.handleAnalysis,
          type: "analysis",
          hidden: row => {
            if (row.participate === "2") {
              return false;
            } else {
              return true;
            }
          },
        },
      ];
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage(params = this.searchForm) {
      this.loadTable(params, getSoPage);
    },
    handleTo(row) {
      this.$openPage(`/questionnaire_edit/${row.id}`, 2);
    },
  },
};
</script>
<style lang="scss" scoped>
.questionnaire-filling ::v-deep .title-wrapper {
  float: left;
  margin-bottom: 0;
}
</style>
