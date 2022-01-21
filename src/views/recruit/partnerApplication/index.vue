<template>
  <iep-basic-container>
    <iep-page-header title="合伙人申请"></iep-page-header>
    <iep-operation-container>
      <template slot="left"></template>
      <template slot="right"></template>
    </iep-operation-container>
    <div class="content">
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <template slot="invitation" slot-scope="scope">
          <div>{{scope.scope.row.invitationTime}}</div>
        </template>
        <IepOperationTableBtnGroup :options="operationOptions" label="操作" :width="100"></IepOperationTableBtnGroup>
      </iep-table>
    </div>
  </iep-basic-container>
</template>

<script>
import mixins from "@/mixins/mixins";
import { tableOption, dictsMap, initSearchForm } from "./options";
import { mapGetters } from "vuex";
import { getPartnerPage } from "@/api/dms/million";

export default {
  mixins: [mixins],
  components: {},
  data() {
    return {
      columnsMap: tableOption,
      dictsMap: dictsMap,
      operationOptions: [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: false,
        },
      ],
      searchForm: initSearchForm(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    searchData(row) {
      this.searchForm = { ...row };
      this.searchPage();
    },
    loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      this.loadTable(param, getPartnerPage);
    },
    handleDetail(row) {
      this.$router.push(`/dms/partner_application/detail/${row.id}`);
    },
  },
  created() {
    this.queryForm.orgId = this.userInfo.orgId;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
</style>