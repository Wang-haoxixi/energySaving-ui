<template>
  <iep-table
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :pagedTable="pagedTable"
    :columnsMap="columnsMap"
    @pagination-current-change="handlePaginationCurrentChange"
  ></iep-table>
</template>
<script>
import mixins from "@/mixins/mixins";
import { columnsMapHistory as columnsMap } from "../options";
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
      this.isLoadTable = false;
      param;
      // this.loadTable(param, );
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
