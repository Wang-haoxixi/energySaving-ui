<template>
  <div>
    <el-table :data="tableData" border style="width: 100%;height:520px;margin-bottom:20px;">
      <el-table-column prop="realName" label="操作人" width="180"></el-table-column>
      <el-table-column prop="content" label="操作内容"></el-table-column>
      <el-table-column prop="createTime" label="操作时间" width="180"></el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;"
      background
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      :page-size="params.size"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
import { getRecordData } from "@/api/gpms/index";
export default {
  props: {
    projectId: {
      type: Number,
    },
  },
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        current: 1,
        size: 12,
      },
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      await getRecordData({ ...this.params, projectId: this.projectId }).then(
        res => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        },
      );
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-table ::v-deep th.is-leaf {
  font-family: "微软雅黑";
  background-color: rgb(242, 244, 245);
  color: $--color-text-primary;
}
</style>
