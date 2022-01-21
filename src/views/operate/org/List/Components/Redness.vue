<template>
  <iep-table
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :pagedTable="pagedTable"
    :columnsMap="columnsMap"
    @pagination-size-change="handlePaginationSizeChange"
    @pagination-current-change="handlePaginationCurrentChange"
  ></iep-table>
</template>
<script>
import { getRednessDetailPage } from "@/api/dms/redness_record";
import mixins from "@/mixins/mixins";
import { columnsMapRedness as columnsMap } from "../options";
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
    getRednessDetailPage() {
      return getRednessDetailPage(this.id, "2");
    },
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      this.loadTable(param, this.getRednessDetailPage);
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
