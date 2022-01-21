<template>
  <iep-dialog :dialog-show="dialogShow" :title="`对应清单`" width="80%" @close="close">
    <p>国家项目名称：企业、事业单位、社会团体等投资建设的固定资产投资项目标准</p>
    <p>基本编码：371230141000</p>
    <p>已对应省级事项目录：</p>
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