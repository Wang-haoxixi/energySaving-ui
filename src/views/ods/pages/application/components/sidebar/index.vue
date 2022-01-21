<template>
  <div>
    <el-table :data="data" stripe border style="width: 100%" @row-click="onRowClick">
      <el-table-column prop="type" :label="title"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "事项类型",
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    // 事项点击事件
    onRowClick(row, column, event) {
      this.$emit("row-click", row, column, event);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.el-table--border {
  border: 1px solid #ebeef5;
}
::v-deep.el-table th.is-leaf,
.el-table td {
  border-bottom: 1px solid #ebeef5;
}
</style>
