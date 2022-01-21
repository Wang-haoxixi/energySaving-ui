<template>
  <div class="content-footer">
    <el-pagination
      :current-page="paginationOption.current"
      :page-size="paginationOption.size"
      :total="paginationOption.total"
      :pager-count="5"
      prev-text="上一页"
      next-text="下一页"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "IepPagination",
  inheritAttrs: false,
  props: {
    paginationOption: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.content-footer {
  background: #fff;
  position: relative;
  margin: 30px 0 40px;
  box-sizing: content-box;
}
.content-footer ::v-deep .el-pagination {
  margin: 0;
  padding: 0;
  text-align: right;
}
.content-footer ::v-deep .btn-prev {
  padding: 0 15px;
}
.content-footer ::v-deep .btn-next {
  padding: 0 15px;
}
.content-footer ::v-deep .el-range-editor.is-active,
.content-footer ::v-deep .el-range-editor.is-active:hover,
.content-footer ::v-deep .el-select .el-input.is-focus .el-input__inner,
.content-footer ::v-deep .el-pagination__sizes .el-input .el-input__inner:hover,
.content-footer
  ::v-deep
  .el-form-item__content
  .el-input.is-active
  .el-input__inner {
  font-family: "微软雅黑";
  border-color: $--border-color;
  color: $--color-text-primary;
}
.content-footer ::v-deep .el-pagination button:hover,
.content-footer ::v-deep .el-pagination.is-background .el-pager li:hover,
.content-footer ::v-deep .el-pagination.is-background .btn-prev:hover,
.content-footer ::v-deep .el-pagination.is-background .btn-next:hover {
  color: $--color-primary;
  background-color: #fff;
  border-color: $--border-color;
}
.content-footer ::v-deep .el-pagination.is-background .btn-prev:disabled:hover {
  border: 1px solid $--border-color;
  background-color: $--background-color;
  color: #babec0;
}
.content-footer ::v-deep .el-pagination.is-background .btn-prev:disabled,
.content-footer ::v-deep .el-pagination.is-background .btn-prev:disabled:hover,
.content-footer ::v-deep .el-pagination.is-background .btn-next:disabled,
.content-footer ::v-deep .el-pagination.is-background .btn-next:disabled:hover {
  margin: 0 5px;
  font-weight: 400;
  border: 1px solid $--border-color;
  background-color: $--background-color;
  color: #babec0;
}
</style>
