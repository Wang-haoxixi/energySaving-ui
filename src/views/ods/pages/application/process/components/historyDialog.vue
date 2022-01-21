<template>
  <iep-dialog :dialog-show="dialogShow" :title="`历史版本`" width="80%" @close="close">
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
          label: "版本号",
          prop: "val1",
        },
        {
          label: "操作者",
          prop: "val11",
        },
        {
          label: "操作时间",
          prop: "val4",
          type: "dict",
        },
        {
          label: "操作",
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