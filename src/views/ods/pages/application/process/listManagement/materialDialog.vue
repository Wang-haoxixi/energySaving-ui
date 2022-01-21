<template>
  <iep-dialog :dialog-show="dialogShow" :title="`选择材料`" width="80%" @close="close">
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
          label: "材料名称",
          prop: "val1",
        },
        {
          label: "材料类型",
          prop: "val12",
        },
        {
          label: "材料分类",
          prop: "val3",
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
          val1: "新版“三证合一”营业执照",
          val2: "原件和复印件",
          val3: "证明类",
        },
        {
          val1: "项目验收材料",
          val2: "原件和复印件",
          val3: "证明类",
        },
        {
          val1: "法定代表人身份证",
          val2: "原件和复印件",
          val3: "证明类",
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