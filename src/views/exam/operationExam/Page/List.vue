<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name">
        <span slot="left" class="title-desc">
          丰富题型、快速组卷、多端答题、智能批卷，轻松实现多场景考试。
          <el-button type="text" @click="useGuide">使用指南</el-button>
        </span>
      </iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsOperationMap"
        :isMutipleSelection="true"
        searchName="examName"
        rowId="id"
        :loadFunction="getOperationExamPage"
        :commonOptions="commonOptions"
        :operationWidth="180"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #createTime="{scope}">{{scope.row.createTime|parseToDay}}</template>
        <template #audit="{scope}">{{dictsMap.audit[scope.row.audit]}}</template>
        <template #openScope="{scope}">{{dictsMap.openScope[scope.row.openScope]}}</template>
        <template #beginStatus="{scope}">{{dictsMap.beginStatus[scope.row.beginStatus]}}</template>
        <template #isRecommend="{scope}">{{dictsMap.isRecommend[scope.row.isRecommend]}}</template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import { dictsMap, columnsOperationMap } from "../../const/testOptions.ts";
import {
  getOperationExamPage,
  recommend,
  audit,
} from "@/api/qms/exam_examination";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dictsMap,
      columnsOperationMap,
      commonOptions: [
        {
          name: "批量上架",
          func: this.handleUp,
          batchOperation: true,
        },
        {
          name: "批量下架",
          func: this.handleDown,
          batchOperation: true,
        },
      ],
    };
  },
  components: {
    AdvanceSearch,
  },
  mixins: [mixins, operationMixins],
  props: ["record"],
  computed: {
    ...mapGetters(["userInfo"]),
    operationOptions() {
      return [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: false,
          disabled: false,
        },
        {
          name: "推荐",
          func: this.handleRecommend,
          hidden: (row) => {
            return row.isRecommend === "1";
          },
        },
        {
          name: "取消推荐",
          func: this.handleRecommend,
          hidden: (row) => {
            return row.isRecommend === "0";
          },
        },
        {
          name: "上架",
          func: this.handleAudit,
          hidden: (row) => {
            return row.audit === "1";
          },
        },
        {
          name: "下架",
          func: this.handleAudit,
          hidden: (row) => {
            return row.audit === "2";
          },
        },
      ];
    },
  },
  created() {},
  methods: {
    handleUp() {
      this.handleAuditBatch(2);
    },
    handleDown() {
      this.handleAuditBatch(1);
    },
    handleAuditBatch(type) {
      const ids = this.$refs["CrudTable"].multipleSelection;
      this.$confirm(
        type === "2" ? "请确认是否批量上架" : "请确认是否批量下架",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          audit({ ids: ids, audit: type }).then((res) => {
            if (res.code === 0) {
              if (res.data === false) {
                this.$message({
                  type: "warning",
                  message: "操作失败!",
                });
              } else {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
              this.$refs.CrudTable.loadPage();
            }
          });
        })
        .catch(() => {});
    },
    handleSearch(form) {
      const newPms = {};
      newPms.openScope = form.openScope;
      newPms.audit = form.audit;
      this.$refs["CrudTable"].searchPage(newPms);
    },
    useGuide() {
      this.$emit("onGuide");
    },
    getOperationExamPage,
    handleDetail(row) {
      this.$emit("onEdit", {
        methodName: "详情",
        id: row.id,
        testPaperId: row.testPaperId,
        edit: true,
      });
    },
    handleRecommend(row) {
      this.$confirm(
        row.isRecommend === "0" ? "请确认是否推荐" : "请确认是否取消推荐",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          recommend({ id: row.id, isRecommend: row.isRecommend }).then(
            (res) => {
              if (res.code === 0) {
                if (res.data === false) {
                  this.$message({
                    type: "warning",
                    message: "操作失败!",
                  });
                } else {
                  this.$message({
                    type: "success",
                    message: "操作成功!",
                  });
                }
                this.$refs.CrudTable.loadPage();
              }
            },
          );
        })

        .catch(() => {});
    },
    handleAudit(row) {
      this.$confirm(
        row.audit === "1" ? "请确认是否下架" : "请确认是否上架",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          audit({ ids: [row.id], audit: row.audit }).then((res) => {
            if (res.code === 0) {
              if (res.data === false) {
                this.$message({
                  type: "warning",
                  message: "操作失败!",
                });
              } else {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
              this.$refs.CrudTable.loadPage();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="scss">
.title-desc {
  font-size: 14px;
  color: gray;
}
</style>
