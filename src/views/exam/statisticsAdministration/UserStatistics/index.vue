<template>
  <iep-crud-table
    class="crud-table"
    ref="CrudTable"
    :dictsMap="dictsMap"
    :columnsMap="columnsMap"
    :loadFunction="getOrgMemberStatisticsPage"
    :operationOptions="operationOptions"
    searchName="realName"
    :isMutipleSelection="false"
  >
    <template #iep-crud-advance-search>
      <advance-search @search-page="handleSearch"></advance-search>
    </template>
    <template #iep-crud-left>
      <div>
        组织内成员共有
        <span class="iep-red">{{count}}</span>
        人进行了考试
      </div>
    </template>
  </iep-crud-table>
</template>
<script>
import { dictsMap as examDictsMap } from "@/views/exam/options";
import {
  getExamOrgStatisticsCount,
  getOrgMemberStatisticsPageByType,
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
      columnsMap: [
        {
          prop: "realName",
          label: "姓名",
        },
        {
          prop: "examTotal",
          label: "考试次数",
        },
        {
          prop: "passRate",
          label: "合格率",
        },
        {
          prop: "certificate",
          label: "证书数量",
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
    getOrgMemberStatisticsPage() {
      return getOrgMemberStatisticsPageByType(this.suffer);
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    // TODO 可能移除
    async loadData() {
      const { data } = await getExamOrgStatisticsCount(this.suffer);
      this.count = data;
    },
    查看(row) {
      const url = `${this.prefixUrl}/exam_user_statistic/${row.userId}`;
      console.log(url);
      this.$openPage(url);
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
