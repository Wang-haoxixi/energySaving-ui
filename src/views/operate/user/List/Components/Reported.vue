<template>
  <iep-table
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :pagedTable="pagedTable"
    :columnsMap="columnsMap"
    @pagination-current-change="handlePaginationCurrentChange"
  >
    <template #createTime="{scope}">{{scope.row.createTime|parseToDay}}</template>
  </iep-table>
</template>
<script>
import { fetchPage } from "@/api/dms/tip_off_manage";
import mixins from "@/mixins/mixins";
import { columnsMapReport as columnsMap } from "../options";
export default {
  mixins: [mixins],
  data() {
    return {
      columnsMap,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    loadPage(param = this.searchForm) {
      param = { ...param, beReportUserId: this.id };
      this.loadTable(param, fetchPage);
    },
  },
  created() {
    this.loadPage();
  },
};
</script>