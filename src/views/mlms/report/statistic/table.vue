<template>
  <div class="report">
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :operationWidth="150"
      :dictsMap="dictMap"
      :columnsMap="columnsMap"
      rowId="reportId"
      :loadFunction="getData"
      searchName="creatorRealName"
      :isInitLoad="false"
      :isCrudSearch="isCrudSearch"
      placeholder="请输入用户名进行搜索"
    ></iep-crud-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import { dictMap, columnsMap } from "./option";
import {
  getWeekMonthReportByOrg,
  getPersonMonthPageByOrg,
  getSoOrgWeekPageByOrg,
  getSoOrgMonthPageByOrg,
  getPersonDailyPage,
} from "@/api/dms/report_so_org_admin";

export default {
  mixins: [mixins],
  components: {},
  data() {
    return {
      commonOptions: [],
      dictMap,
      columnsMap,
      getData: getPersonDailyPage,
      tabFnList: {
        personDaily: getPersonDailyPage,
        staffWeek: getWeekMonthReportByOrg,
        staffMonth: getPersonMonthPageByOrg,
        organizeWeek: getSoOrgWeekPageByOrg,
        organizeMonth: getSoOrgMonthPageByOrg,
      },
      isCrudSearch: true,
      requestFn: "personDaily",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    operationOptions() {
      return [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: this.hideSubmit,
          disabled: false,
        },
      ];
    },
  },
  methods: {
    loadPage(fn) {
      this.requestFn = fn;
      if (fn === "staffWeek" || fn === "staffMonth") {
        this.isCrudSearch = true;
      } else {
        this.isCrudSearch = false;
      }
      this.getData = this.tabFnList[fn];
      this.$nextTick(() => {
        this.$refs.CrudTable.loadPage();
      });
    },
    handleDetail(row) {
      this.$emit("handleDetail", row, this.requestFn);
    },
  },
  mounted() {
    this.$refs.CrudTable.queryForm = {
      nowOrgId: this.userInfo.orgId,
    };
    this.$refs.CrudTable.searchPage();
  },
};
</script>

<style lang="scss" scoped>
.report {
  margin-top: -55px;
}
</style>

