<template>
  <iep-dialog :dialog-show="dialogShow" :title="`选择事项`" width="80%" @close="close">
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <el-table-column prop="operation" label="操作" width="240" fixed="right">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button type="text" @click="handleChoose(scope.row)">选择</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
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
          label: "基础编码",
          prop: "val12",
        },
        {
          label: "实施主体",
          prop: "val3",
        },
        {
          label: "实施主体编码",
          prop: "val4",
        },
        {
          label: "事项类别",
          prop: "val5",
        },
        {
          label: "行政区划",
          prop: "val6",
        },
        {
          label: "事项状态",
          prop: "val7",
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
      this.pagedTable = [
        {
          val1: "烟草专卖零售许可证新办办理",
          val2: "990113001000",
          val3: "ZJ省市场监管局",
          val4: "569874236025742065",
          val5: "行政许可",
          val6: "ZJ省",
          val7: "在用",
        },
      ];
    },
    open() {
      this.dialogShow = true;
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
    handleChoose(row) {
      this.$emit("get-data", row);
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>