<template>
  <div class="questionnaire-box">
    <full-screen-dialog ref="fullScreenDialog">
      <template slot="main">
        <iep-page-header :title="$route.meta.name"></iep-page-header>
        <iep-operation-container>
          <template slot="left">
            <el-tabs v-model="currentTab" @tab-click="handleClickTab">
              <el-tab-pane :label="Tabs[0]['label']" :name="Tabs[0]['value']"></el-tab-pane>
              <el-tab-pane :label="Tabs[1]['label']" :name="Tabs[1]['value']"></el-tab-pane>
            </el-tabs>
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
          <template #status="{scope}">{{dictsMap.status[scope.row.status] || '暂无'}}</template>
          <template
            #startTime="{scope}"
          >{{scope.row.timeSetting===2&&scope.row.startTime | parseToTimeMinutes}}</template>
          <template
            #endTime="{scope}"
          >{{scope.row.timeSetting===2&&scope.row.endTime | parseToTimeMinutes}}</template>
          <template
            #joinPeople="{scope}"
          >{{ (scope.row.status === '2' || scope.row.status === '4' || scope.row.status === '5') ? '暂无' : scope.row.joinPeople}}</template>
          <template #address="{scope}">
            <div class="ellipsis">
              <template
                v-if="scope.row.status === '2' || scope.row.status === '4' || scope.row.status === '5'"
              >暂无</template>
              <template v-else-if="scope.row.status === '3'">已关闭</template>
              <template v-else>
                <router-link
                  target="_blank"
                  :to="`/questionnaire_edit/${scope.row.id}`"
                >{{getUrl(scope.row)}}</router-link>
              </template>
            </div>
          </template>
          <template #qrCode="{scope}">
            <el-button
              v-if="['1','6'].includes(scope.row.status)"
              type="text"
              @click="handleQrCode(scope.row)"
            >查看二维码</el-button>
            <template v-else>暂无</template>
          </template>
          <iep-operation-table-btn-group :options="operationOptions" :width="150"></iep-operation-table-btn-group>
        </iep-table>
      </template>
      <template slot="form">
        <!-- 创建 新增 -->
        <main-dialog
          ref="mainDialog"
          @close="closeFullScreenDialog"
          v-if="type === 'add'"
          @after-submit="afterSubmitMain"
        ></main-dialog>
        <!-- 预览 -->
        <dialog-view
          ref="dialogView"
          :disabled="false"
          v-if="type === 'view'"
          @close="closeFullScreenDialog"
        ></dialog-view>
        <!-- 分析报告 -->
        <dialog-analysis
          ref="dialogAnalysis"
          v-if="type === 'analysis'"
          @close="closeFullScreenDialog"
        ></dialog-analysis>
        <!-- 统计 -->
        <dialog-statistics
          ref="dialogStatistics"
          v-if="type === 'statistics'"
          @close="closeFullScreenDialog"
        ></dialog-statistics>
      </template>
    </full-screen-dialog>
    <IepImgViewer ref="imgViewer"></IepImgViewer>
    <dialog-refdate @loadPage="loadPage" ref="dialogRefdate"></dialog-refdate>
  </div>
</template>
<script>
import FullScreenDialog from "../components/fullScreenDialog";
import AdvanceSearch from "./components/advanceSearch";
import MainDialog from "./dialog/main/index";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import DialogView from "./dialog/view/index";
import DialogAnalysis from "./dialog/analysis/index";
import DialogStatistics from "./dialog/statistics/index";
import DialogRefdate from "../my/components/DialogRefdate";
import currentMixin from "./mixins/index";
import { dictsMap, columnsMap } from "./const/options";
import { hasPermissions } from "@/util/menu";
import { statusType } from "./const/const";
import {
  getManagePage,
  getScopeManagePage,
  // changeByState,
  setTopStatus,
  // passPage,
  rejectPage,
  adoptPage,
} from "@/api/qms/questionnaire";
const STATUS = {
  noTop: [statusType.doing, statusType.end], // 取消置顶
  top: [statusType.doing], // 置顶
  end: [statusType.doing, statusType.nostart], // 结束
  export: [statusType.doing, statusType.end], // 导出
  statistics: [statusType.doing, statusType.end], // 统计
  analysis: [statusType.doing, statusType.end], // 分析报告
  delete: [statusType.end, statusType.reject], // 删除
  pass: [statusType.review], // 通过
  reject: [statusType.review], // 驳回
  view: [
    statusType.doing,
    statusType.end,
    statusType.review,
    statusType.reject,
    statusType.nostart,
  ], // 预览
  refdate: [statusType.doing, statusType.nostart], //更改时间
};
const Tabs = [
  {
    label: "生态问卷",
    value: "ManagePage",
  },
  {
    label: "组织内问卷",
    value: "ScopeManagePage",
  },
];
const TOP = {
  top: 2,
  noTop: 1,
};
const SCOPE = {
  scope: 2,
  noScope: 1,
};
export default {
  mixins: [operationMixins, mixins, currentMixin],
  components: {
    FullScreenDialog,
    AdvanceSearch,
    MainDialog,
    DialogView,
    DialogAnalysis,
    DialogStatistics,
    DialogRefdate,
  },
  data() {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [],
      type: "",
      isRoute: true,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      Tabs,
      currentTab: Tabs[0].value,
    };
  },
  computed: {
    operationOptions() {
      return [
        {
          name: "取消置顶",
          func: this.handleNoTop,
          type: "noTop",
          hidden: (row) => {
            return !(
              STATUS.noTop.includes(row.status) &&
              row.top === TOP.top &&
              row.scope === SCOPE.noScope &&
              hasPermissions("ques_questionnaire_no_top")
            );
          },
        },
        {
          name: "置顶",
          func: this.handleTop,
          type: "top",
          hidden: (row) => {
            return !(
              STATUS.top.includes(row.status) &&
              row.top === TOP.noTop &&
              row.scope === SCOPE.noScope &&
              hasPermissions("ques_questionnaire_top")
            );
          },
        },
        {
          name: "结束",
          func: this.handleEnd,
          type: "end",
          hidden: ({ status }) => {
            return !(
              STATUS.end.includes(status) &&
              hasPermissions("ques_questionnaire_end")
            );
          },
        },
        {
          name: "通过",
          func: this.handlePass,
          type: "pass",
          hidden: ({ status, scope }) => {
            return !(
              STATUS.pass.includes(status) &&
              scope === SCOPE.noScope &&
              hasPermissions("ques_questionnaire_pass")
            );
          },
        },
        {
          name: "驳回",
          func: this.handleReject,
          type: "reject",
          hidden: ({ status, scope }) => {
            return !(
              STATUS.reject.includes(status) &&
              scope === SCOPE.noScope &&
              hasPermissions("ques_questionnaire_reject")
            );
          },
        },
        {
          name: "预览",
          func: this.handleView,
          type: "view",
          hidden: ({ status }) => {
            return !(
              STATUS.view.includes(status) &&
              hasPermissions("ques_questionnaire_view")
            );
          },
        },
        {
          name: "导出",
          func: this.handleExport,
          type: "export",
          hidden: ({ status }) => {
            return !(
              STATUS.export.includes(status) &&
              hasPermissions("ques_questionnaire_export")
            );
          },
        },
        {
          name: "统计",
          func: this.handleStatistics,
          type: "statistics",
          hidden: ({ status }) => {
            return !(
              STATUS.statistics.includes(status) &&
              hasPermissions("ques_questionnaire_statistics")
            );
          },
        },
        {
          name: "分析报告",
          func: this.handleAnalysis,
          type: "analysis",
          hidden: ({ status }) => {
            return !(
              STATUS.analysis.includes(status) &&
              hasPermissions("ques_questionnaire_analysis")
            );
          },
        },
        {
          name: "删除",
          func: this.handleDelete,
          type: "delete",
          hidden: ({ status }) => {
            return !(
              STATUS.delete.includes(status) &&
              hasPermissions("ques_questionnaire_delete")
            );
          },
        },
        {
          name: "更改问卷信息",
          func: this.handleRefdate,
          type: "refdate",
          hidden: ({ status }) => {
            return !(
              STATUS.refdate.includes(status) &&
              hasPermissions("ques_quesAnswer_edit")
            );
          },
        },
      ];
    },
  },
  created() {
    this.$route.query.tabName && (this.currentTab = this.$route.query.tabName);
    this.loadPage();
  },
  methods: {
    loadPage(params = this.searchForm) {
      let fn = getManagePage;
      if (this.currentTab === this.Tabs[1]["value"]) {
        fn = getScopeManagePage;
      }
      this.loadTable(params, fn);
    },
    handleReject(row) {
      this._handleComfirmINPUT(
        row.id,
        rejectPage,
        "驳回",
        "是否驳回问卷",
        "驳回问卷成功",
      );
    },
    // 取消置顶
    handleNoTop(row) {
      this._handleComfirmNOID(
        { id: row.id, top: TOP.noTop },
        setTopStatus,
        "取消置顶",
      );
    },
    // 置顶
    handleTop(row) {
      this._handleComfirmNOID(
        { id: row.id, top: TOP.top },
        setTopStatus,
        "置顶问卷",
      );
    },
    // 通过
    handlePass(row) {
      this._handleComfirm(row.id, adoptPage, "通过问卷");
    },
    // 预览
    handleView(row) {
      this.type = "view";
      this.openFullScreenDialog();
      this.$nextTick(() => {
        this.$refs.dialogView.open(row.id);
      });
    },
    // 分析报告
    handleAnalysis(row) {
      this.type = "analysis";
      this.openFullScreenDialog();
      this.$nextTick(() => {
        this.$refs.dialogAnalysis.open(row);
      });
    },
    handleClickTab() {
      this.$router.push({
        query: {
          tabName: this.currentTab,
        },
      });
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.full-screen-dialog ::v-deep .title-wrapper {
  margin-bottom: 10px;
}
.full-screen-dialog ::v-deep .title-wrapper .left {
  font-size: 18px;
}
.questionnaire-box ::v-deep .operation-container {
  margin-bottom: 0;
  > div:nth-child(2) {
    align-items: flex-start;
    .input-wrapper {
      margin-top: 6px;
    }
  }
}
</style>
