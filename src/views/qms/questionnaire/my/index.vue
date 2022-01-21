<template>
  <div class="dialog-main">
    <full-screen-dialog ref="fullScreenDialog">
      <template slot="main">
        <iep-page-header :title="$route.meta.name"></iep-page-header>
        <iep-operation-container>
          <template slot="left">
            <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
            <el-checkbox
              v-model="searchForm.create"
              true-label="2"
              false-label="1"
              @change="onChange"
            >只看我创建的问卷</el-checkbox>
          </template>
          <template slot="right">
            <iep-operation-search @search-page="searchPage" :paramForm="searchForm" prop="name">
              <advance-search @search-page="searchPage" ref="advanceSearch"></advance-search>
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
          <template #status="{scope}">{{dictsMap.status[scope.row.status] || "暂无"}}</template>
          <template #scope="{scope}">{{dictsMap.scope[scope.row.scope] || "暂无"}}</template>
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
        <!-- 创建 编辑 -->
        <main-dialog
          ref="mainDialog"
          @close="closeFullScreenDialog"
          v-if="type === 'add' || type === 'edit'"
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
    <dialog-refdate @loadPage="loadPage" ref="dialogRefdate"></dialog-refdate>
    <IepImgViewer ref="imgViewer"></IepImgViewer>
  </div>
</template>
<script>
import FullScreenDialog from "../components/fullScreenDialog";
import AdvanceSearch from "./components/advanceSearch";
import MainDialog from "../manage/dialog/main/index";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import DialogView from "../manage/dialog/view/index";
import DialogAnalysis from "../manage/dialog/analysis/index";
import DialogStatistics from "../manage/dialog/statistics/index";
import DialogRefdate from "./components/DialogRefdate";
import { columnsMap } from "./const/options";
import { dictsMap } from "../manage/const/options";
import currentMixin from "../manage/mixins/index";
import { statusType } from "../manage/const/const";
import { getPage, submitPage, passPage } from "@/api/qms/questionnaire";
import { hasPermissions } from "@/util/menu";
const STATUS1 = {
  // 生态
  end: [statusType.doing, statusType.nostart], // 结束
  export: [statusType.doing, statusType.end], // 导出
  statistics: [statusType.doing, statusType.end], // 统计
  analysis: [statusType.doing, statusType.end], // 分析报告
  delete: [statusType.draft, statusType.end, statusType.reject], // 删除
  submit: [statusType.draft, statusType.reject], // 提交
  release: [], // 发布
  edit: [statusType.draft, statusType.reject, statusType.end], // 编辑
  view: [
    statusType.doing,
    statusType.draft,
    statusType.end,
    statusType.review,
    statusType.reject,
    statusType.nostart,
  ], // 预览
  refdate: [statusType.doing, statusType.nostart], //更改时间
};
const STATUS2 = {
  //so内
  end: [statusType.doing, statusType.nostart], // 结束
  export: [statusType.doing, statusType.end], // 导出
  statistics: [statusType.doing, statusType.end], // 统计
  analysis: [statusType.doing, statusType.end], // 分析报告
  delete: [statusType.draft, statusType.end, statusType.reject], // 删除
  submit: [], // 提交
  edit: [statusType.draft, statusType.end], // 编辑
  release: [statusType.draft], // 发布
  view: [
    statusType.doing,
    statusType.draft,
    statusType.end,
    statusType.nostart,
  ], // 预览
  refdate: [statusType.doing, statusType.nostart], //更改时间
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
      isRoute: true,
      pagedTable: [],
      type: "",
      form: {},
    };
  },
  computed: {
    commonOptions() {
      return [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
          hidden: !hasPermissions("ques_quesAnswer_add"),
        },
      ];
    },
    operationOptions() {
      return [
        {
          name: "结束",
          func: this.handleEnd,
          type: "end",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.end.includes(status) &&
              hasPermissions("ques_quesAnswer_end")
            );
          },
        },
        {
          name: "提交",
          func: this.handleSubmit,
          type: "submit",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.submit.includes(status) &&
              hasPermissions("ques_quesAnswer_submit")
            );
          },
        },
        {
          name: "发布",
          func: this.handleRelease,
          type: "release",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.release.includes(status) &&
              hasPermissions("ques_quesAnswer_submit")
            );
          },
        },
        {
          name: "编辑",
          func: this.handleEdit,
          type: "edit",
          hidden: ({ status, joinPeople, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.edit.includes(status) &&
              hasPermissions("ques_quesAnswer_edit") &&
              !joinPeople
            );
          },
        },
        {
          name: "预览",
          func: this.handleView,
          type: "view",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.view.includes(status) &&
              hasPermissions("ques_quesAnswer_view")
            );
          },
        },
        {
          name: "导出",
          func: this.handleExport,
          type: "export",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.export.includes(status) &&
              hasPermissions("ques_quesAnswer_export")
            );
          },
        },
        {
          name: "统计",
          func: this.handleStatistics,
          type: "statistics",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.statistics.includes(status) &&
              hasPermissions("ques_quesAnswer_statistics")
            );
          },
        },
        {
          name: "复制",
          func: this.handleCopy,
          type: "copy",
          hidden: !hasPermissions("ques_quesAnswer_add"),
        },
        {
          name: "删除",
          func: this.handleDelete,
          type: "delete",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.delete.includes(status) &&
              hasPermissions("ques_quesAnswer_delete")
            );
          },
        },
        {
          name: "分析报告",
          func: this.handleAnalysis,
          type: "analysis",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.analysis.includes(status) &&
              hasPermissions("ques_quesAnswer_analysis")
            );
          },
        },
        {
          name: "更改问卷信息",
          func: this.handleRefdate,
          type: "refdate",
          hidden: ({ status, scope }) => {
            const result = this.getScopeStatus(scope);
            return !(
              result.refdate.includes(status) &&
              hasPermissions("ques_quesAnswer_edit")
            );
          },
        },
      ];
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    onChange(data) {
      this.searchForm.create = data;
      this.$refs.advanceSearch.initSearchForm();
      // this.loadPage();
      this.searchPage();
    },
    async loadPage(params = this.searchForm) {
      await this.loadTable(
        { ...params },
        getPage(this.searchForm.create == null ? "1" : this.searchForm.create),
      );
    },
    // 判断是so内，还是生态
    getScopeStatus(scope = "") {
      return scope === 2 ? STATUS2 : STATUS1;
    },
    // 编辑
    handleEdit(row) {
      this.type = "edit";
      this.openFullScreenDialog();
      this.$nextTick(() => {
        this.$refs.mainDialog.open(row.id);
      });
    },
    // 提交
    handleSubmit(row) {
      if (row.openAward === 2) {
        this._handleComfirmBySafePassword(
          row.id,
          submitPage,
          "提交问卷",
          "涉及宝贝交易，请输入支付密码",
          "是否提交问卷",
          "请等待审核",
        );
      } else {
        this._handleComfirm(
          row.id,
          submitPage,
          "提交问卷",
          "是否提交问卷",
          "请等待审核",
        );
      }
    },
    // 发布
    handleRelease(row) {
      if (row.openAward === 2) {
        this._handleComfirmBySafePassword(
          row.id,
          passPage,
          "发布问卷",
          "涉及宝贝交易，请输入支付密码",
        );
      } else {
        this._handleComfirm(row.id, passPage, "发布问卷");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.full-screen-dialog ::v-deep .title-wrapper .left {
  font-size: 18px;
}
</style>
