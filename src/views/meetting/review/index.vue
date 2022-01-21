<template>
  <div>
    <iep-basic-container>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        searchName="name"
        :loadFunction="getReviewPage"
        :isMutipleSelection="false"
        :layout="layout"
      >
        <template #iep-crud-left>
          <iep-page-header :title="$route.meta.name"></iep-page-header>
        </template>
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
        <template #name="{scope}">
          <div
            style="cursor: pointer;"
            @click="$openPage(`/channel/activity/detail/${scope.row.id}`)"
          >{{scope.row.name}}</div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <iep-review @ok="rejectCallBack" :show-word-limit="true" ref="IepReview"></iep-review>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { dictsMap, columnsMap } from "./options";
import AdvanceSearch from "./AdvanceSearch";
import {
  getReviewPage,
  offShelfById,
  // putShelfById,
  rejectActivity,
  passById,
  cancelRecommandById,
  recommandById,
} from "@/api/meetting/publish";
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [operationMixins],
  data() {
    return {
      checkAuditStatus: false,
      checkRecommend: false,
      dictsMap,
      commonOptions: [],
      operationOptions: [
        {
          name: "通过",
          func: this.handlePass,
          hidden: row => {
            // 如果认证中
            return !(row.auditStatus === "1");
          },
        },
        {
          name: "驳回",
          func: this.handleReject,
          hidden: row => {
            // 如果认证中
            return !(row.auditStatus === "1");
          },
        },
        {
          name: "下架",
          func: this.handleOffShelf,
          hidden: row => {
            return !(row.isRecommend !== "1" && row.statusFlag !== "3");
          },
        },
        // {
        //   name: "重新上架",
        //   func: this.handlePutShelf,
        //   hidden: row => {
        //     return !(row.statusFlag === "3");
        //     // return true;
        //   },
        // },
        {
          name: "推荐",
          func: this.handleRecommend,
          hidden: row => {
            return !(
              row.isRecommend === "0" &&
              row.auditStatus === "3" &&
              row.statusFlag === "1"
            );
          },
        },
        {
          name: "取消推荐",
          func: this.handleCancelRecommend,
          hidden: row => {
            return !(row.isRecommend === "1");
          },
        },
        {
          name: "驳回理由",
          func: this.handleRejectReason,
          hidden: row => {
            return !(row.auditStatus === "2");
          },
        },
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: v => {
            return v.statusFlag === "3";
          },
        },
      ],
      columnsMap,
      layout: "total, prev, pager, next",
    };
  },
  methods: {
    getReviewPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      for (const key in form) {
        form[key] || delete form[key];
      }
      this.$refs["CrudTable"].searchPage(form);
    },

    handleOffShelf(row) {
      this._handleComfirm(row.id, offShelfById, "下架");
    },
    // handlePutShelf(row) {
    //   this._handleComfirm(row.id, putShelfById, "重新上架");
    // },
    handleReject(row) {
      this.$refs["IepReview"].form = {
        id: row.id,
        type: 4,
        text: "",
      };
      this.$refs["IepReview"].dialogTitle = "驳回理由";
      this.$refs["IepReview"].prop = "text";
      this.$refs["IepReview"].formRequestFn = rejectActivity;
      this.$refs["IepReview"].dialogShow = true;
    },

    handlePass(row) {
      this._handleComfirm(row.id, passById, "通过");
    },
    handleRecommend(row) {
      this._handleComfirm(row.id, recommandById, "推荐");
    },
    handleCancelRecommend(row) {
      this._handleComfirm(row.id, cancelRecommandById, "取消推荐");
    },
    handleRejectReason(row) {
      this.$alert(row.rejectReason || "无驳回理由", "驳回理由", {
        confirmButtonText: "确定",
        callback: () => {},
      });
    },
    handleEdit(row) {
      //编辑
      this.$openPage(`/meetting/publish/${row.id}`);
    },
    rejectCallBack() {
      this.$message.success("驳回成功");
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>