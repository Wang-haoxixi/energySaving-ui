<template>
  <div class="activity-common">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        searchName="name"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :loadFunction="getActivityPagePC"
        :is-expand="true"
        :default-expand="true"
        :isMutipleSelection="false"
        :layout="layout"
      >
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
        <template #iepCrudTableExpend="{scope}">
          <TimeAndCreator :scope="scope" isAdvance></TimeAndCreator>
        </template>
        <template #poster="{scope}">
          <ActivityImgColumn :scope="scope"></ActivityImgColumn>
        </template>
        <template #detail="{scope}">
          <ActivityInfoColumn :scope="scope"></ActivityInfoColumn>
        </template>
        <template #statusFlag="{scope}">
          <ActivityStatusColumn :scope="scope"></ActivityStatusColumn>
        </template>
        <template #auditStatus="{scope}">
          <ActivityAuditColumn :scope="scope"></ActivityAuditColumn>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>

<script>
// SO活动管理
import { getActivityPagePC, endActivityById } from "@/api/meetting/publish";
import { columnsAdminListMap, dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import { deleteActivityById } from "@/api/meetting/publish";
import TimeAndCreator from "../Components/TimeAndCreator";
import ActivityInfoColumn from "../Components/ActivityInfoColumn";
import ActivityImgColumn from "../Components/ActivityImgColumn";
import ActivityStatusColumn from "../Components/ActivityStatusColumn";
import ActivityAuditColumn from "../Components/ActivityAuditColumn";
import AdvanceSearch from "./AdvanceSearch";

export default {
  mixins: [operationMixins],
  components: {
    TimeAndCreator,
    ActivityInfoColumn,
    ActivityImgColumn,
    ActivityStatusColumn,
    ActivityAuditColumn,
    AdvanceSearch,
  },
  data() {
    return {
      dictsMap,
      columnsMap: columnsAdminListMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handlePublish,
        },
      ],

      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: v => {
            return v.statusFlag === "3";
          },
        },
        {
          name: "结束",
          func: this.handleEnd,
          hidden: v => {
            return !(v.statusFlag === "1");
          },
        },
        {
          name: "删除",
          func: this.handleDel,
        },
        {
          name: "驳回理由",
          func: this.handleRejectReason,
          hidden: row => {
            return !(row.auditStatus === "2");
          },
        },
      ],
      layout: "total, prev, pager, next",
    };
  },
  computed: {},
  methods: {
    getActivityPagePC,
    handlePublish() {
      //新增
      this.$openPage("/meetting/publish/0");
    },
    handleEdit(row) {
      //编辑
      this.$openPage(`/meetting/publish/${row.id}`);
    },
    async handleEnd(row) {
      await this._handleComfirm(row.id, endActivityById, "结束活动");
      // this.changeData();
    },
    async handleDel(row) {
      //删除
      await this._handleComfirm(row.id, deleteActivityById, "删除活动");
      // this.changeData();
    },
    handleRejectReason(row) {
      this.$alert(row.rejectReason || "无驳回理由", "驳回理由", {
        confirmButtonText: "确定",
        callback: () => {},
      });
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      for (const key in form) {
        form[key] || delete form[key];
      }
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
::v-deep .el-table th.gutter:last-of-type {
  display: table-cell !important;
  width: 150px !important;
}
</style>
