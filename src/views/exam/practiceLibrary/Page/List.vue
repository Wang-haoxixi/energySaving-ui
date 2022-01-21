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
        :columnsMap="columnsPracticeMap"
        :isMutipleSelection="false"
        searchName="examName"
        rowId="id"
        :loadFunction="getExamexaminationPage"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #iep-crud-left>
          <iep-operation-wrapper>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          </iep-operation-wrapper>
        </template>
        <template #beginTime="{scope}">{{scope.row.beginTime|parseToDay}}</template>
        <template #endTime="{scope}">{{scope.row.endTime|parseToDay}}</template>
        <template #createTime="{scope}">{{scope.row.createTime|parseToDay}}</template>
        <template #state="{scope}">{{dictsMap.state[scope.row.state]}}</template>
        <template #audit="{scope}">{{dictsMap.audit[scope.row.audit]}}</template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import { dictsMap, columnsPracticeMap } from "../../const/testOptions.ts";
import {
  getExamexaminationPage,
  delExerciseById,
} from "@/api/qms/exam_exercise";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dictsMap,
      columnsPracticeMap,
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
        },
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
        {
          name: "成绩管理",
          func: this.handleOrg,
        },
      ];
    },
  },
  created() {},
  methods: {
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleDel(row) {
      this._handleComfirm(row.id, delExerciseById, "删除");
    },
    handleSearch(form) {
      const newPms = {};
      if (form.qTypeString) {
        newPms.kind = form.qTypeString;
      }
      newPms.state = form.state;
      this.$refs["CrudTable"].searchPage(newPms);
    },
    useGuide() {
      this.$emit("onGuide");
    },
    getExamexaminationPage,
    handleAdd() {
      this.$emit("onEdit", {
        methodName: "新增",
        id: "",
        edit: false,
        orgId: this.userInfo.orgId,
      });
    },
    handleEdit(row) {
      this.$emit("onEdit", {
        methodName: "编辑",
        id: row.id,
        testPaperId: row.testPaperId,
        edit: false,
      });
    },
    handleDetail(row) {
      this.$emit("onEdit", {
        methodName: "详情",
        id: row.id,
        testPaperId: row.testPaperId,
        edit: true,
      });
    },
    // handleDelete(row) {
    //   const ids = [row.id];
    //   this._handleComfirm(ids, deleteExamquestion, "删除");
    // },
    // handleType() {
    //   this.$refs["dialogType"].dialogShow = true;
    // },
    handleOrg(row) {
      this.$emit("onManage", {
        methodName: "成绩管理",
        id: row.id,
      });
      //this.$openPage(`/exam/result_org/${row.id}`);
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
