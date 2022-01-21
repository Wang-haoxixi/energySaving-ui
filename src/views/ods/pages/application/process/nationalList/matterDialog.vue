<template>
  <iep-dialog :dialog-show="dialogShow" :title="`事项`" width="80%" @close="close">
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    ></iep-table>
  </iep-dialog>
</template>
<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      columnsMap: [
        {
          label: "事项名称",
          prop: "val1",
        },
        {
          label: "事项编码",
          prop: "val11",
        },
        {
          label: "实施主体",
          prop: "val4",
          type: "dict",
        },
        {
          label: "事项类别",
          prop: "val2",
        },
      ],
      pagedTable: [],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  mounted() {
    this.loadPages();
  },
  methods: {
    loadPages() {
      this.isLoadTable = false;
    },
    open() {
      this.dialogShow = true;
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>