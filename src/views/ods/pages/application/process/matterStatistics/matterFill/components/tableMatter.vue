<template>
  <div style="margin-top: 20px;">
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
            <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import { mockData } from "./mock";
export default {
  mixins: [mixins],
  computed: {
    ...mapGetters(["tableSize"]),
  },
  data() {
    return {
      mockData,
      isLoadTable: false,
      columnsMap: [
        {
          label: "事项名称",
          prop: "val1",
        },
        {
          label: "事项类别",
          prop: "val2",
        },
        {
          label: "实施主体",
          prop: "val13",
        },
        {
          label: "实施清单编码",
          prop: "val5",
        },
      ],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = this.mockData.data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
    // 详情
    handleDetail(row) {
      this.pageState = "form";
      this.formStatus = "detail";
      const params = {
        pageState: this.pageState,
        formStatus: this.formStatus,
        data: row,
      };
      this.$emit("open-detail", params);
    },
  },
};
</script>