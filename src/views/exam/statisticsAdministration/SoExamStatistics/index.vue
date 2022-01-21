<template>
  <iep-crud-table
    class="crud-table"
    ref="CrudTable"
    id="orgId"
    :columnsMap="columnsMap"
    :loadFunction="getSoExamStatisticsPage"
    :operationOptions="operationOptions"
    searchName="orgName"
    :isMutipleSelection="false"
  >
    <template #iep-crud-advance-search>
      <advance-search @search-page="handleSearch"></advance-search>
    </template>
    <template #iep-crud-left>
      <div>
        共有了
        <span class="iep-red">{{countList[0]}}</span>
        个组织, 发布了
        <span class="iep-red">{{countList[1]}}</span>
        场考试
      </div>
    </template>
  </iep-crud-table>
</template>
<script>
import {
  getSoExamStatisticsCount,
  getSoExamStatisticsPage,
} from "@/api/exam/exam_statistics";
import AdvanceSearch from "./AdvanceSearch";
export default {
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      countList: [0, 0],
      operationOptions: [
        {
          name: "查看",
          func: this.查看,
        },
      ],
      columnsMap: [
        {
          prop: "orgName",
          label: "组织名称",
        },
        {
          prop: "releaseExamTotal",
          label: "发布考试次数",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    getSoExamStatisticsPage,
    // TODO 可能移除
    async loadData() {
      const { data } = await getSoExamStatisticsCount();
      this.countList = data;
    },
    查看(row) {
      const url = `/yyexam/so_exam_statistic/${row.orgId}`;
      this.$openPage(url);
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
