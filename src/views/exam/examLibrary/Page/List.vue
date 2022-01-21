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
        :columnsMap="columnsMap"
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
import { dictsMap, columnsMap } from "../../const/testOptions.ts";
import { getRefund } from "@/api/qms/test_questions_library";
import { getExamexaminationPage } from "@/api/qms/exam_examination";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dictsMap,
      columnsMap,
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
          name: "编辑",
          func: this.handleEdit,
          hidden: false,
          disabled: false,
        },
        {
          name: "考试管理",
          func: this.handleOrg,
          hidden: false,
          disabled: false,
        },
        {
          name: "退款",
          func: this.refund,
          hidden: (val) => {
            return !(val.state === "0" && val.deductionsState === "1");
          },
          disabled: false,
        },
      ];
    },
  },
  created() {},
  methods: {
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
      this.$openPage(`/exam/result_org/${row.id}`);
    },
    refund(val) {
      this.$confirm("请确认是否退款！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getRefund({ id: val.id }).then((res) => {
            if (res.code === 0) {
              if (res.data === false) {
                this.$message({
                  type: "warning",
                  message: res.message,
                });
              } else {
                // 后端成功给了我一个success提示 要求提示前端 退款成功。前端再写一个
                this.$message({
                  type: "success",
                  message: "退款成功!",
                });
              }
              this.loadDict();
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
