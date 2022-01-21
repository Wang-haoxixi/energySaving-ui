<template>
  <!-- 办理流程表格 -->
  <div style="margin-top: 20px;">
    <iep-table
      style="width: 100%"
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="data"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <el-table-column prop="operation" label="操作" width="200" fixed="right">
        <template>
          <iep-operation-wrapper>
            <el-button type="text">详情</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoadTable: false,
      columnsMap: [
        {
          label: "环节名称",
          prop: "val1",
        },
        {
          label: "办理内容",
          prop: "val2",
        },
        {
          label: "办理时限",
          prop: "val3",
        },
        {
          label: "办理结果",
          prop: "val4",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
};
</script>