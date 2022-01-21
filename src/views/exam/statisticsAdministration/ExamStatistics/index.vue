<template>
  <iep-crud-table
    class="crud-table"
    ref="CrudTable"
    :dictsMap="dictsMap"
    :columnsMap="columnsMap"
    :loadFunction="getExamStatisticsPage"
    :operationOptions="operationOptions"
    searchName="examName"
    :isMutipleSelection="false"
  >
    <template #iep-crud-advance-search>
      <advance-search @search-page="handleSearch"></advance-search>
    </template>
    <template #iep-crud-left>
      <div>
        共发布了
        <span class="iep-red">{{count}}</span>
        场考试。
      </div>
    </template>
  </iep-crud-table>
</template>
<script>
import { dictsMap as examDictsMap } from "@/views/exam/options";
import {
  getExamStatisticsCount,
  getExamStatisticsPageByType,
} from "@/api/exam/exam_statistics";
import AdvanceSearch from "./AdvanceSearch";
import { mapGetters } from "vuex";
import { typeMap } from "../options";
export default {
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      // TODO 更换接口
      dictsMap: {
        openScope: examDictsMap.openScope,
      },
      count: 0,
      operationOptions: [
        {
          name: "查看",
          func: this.查看,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
    prefixUrl() {
      return this.isPlatform ? "/yyexam" : "/exam";
    },
    suffer() {
      return typeMap[this.currentMenuGroup.id];
    },
    getExamStatisticsPage() {
      return getExamStatisticsPageByType(this.suffer);
    },
    columnsMap() {
      const addColumns = this.isPlatform
        ? [
            {
              prop: "orgName",
              label: "组织名称",
            },
          ]
        : [];
      return [
        {
          prop: "examName",
          label: "考试名称",
        },
        ...addColumns,
        {
          prop: "openScope",
          label: "开放范围",
          type: "dict",
        },
        {
          prop: "takeTotal",
          label: "参加人数",
        },
        {
          prop: "passTotal",
          label: "及格人数",
        },
        {
          prop: "passRate",
          label: "合格率",
        },
        {
          prop: "avgScore",
          label: "平均分",
        },
      ];
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    // TODO 可能移除
    async loadData() {
      const { data } = await getExamStatisticsCount(this.suffer);
      this.count = data;
    },
    查看(row) {
      const url = `${this.prefixUrl}/exam_statistic/${row.examId}`;
      console.log(url);
      this.$openPage(url);
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
