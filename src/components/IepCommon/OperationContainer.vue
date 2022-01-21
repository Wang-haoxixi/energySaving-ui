<template>
  <div class="operation-container">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepOperationContainer",
};
</script>

<style lang="scss" scoped>
.operation-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > div > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &:last-child.el-button--default.is-plain {
      &:hover,
      &:focus {
        border-color: $--border-color;
        background-color: $--background-color;
        color: $--color-text-primary;
      }
    }
  }
}
.operation-container ::v-deep .el-checkbox-group {
  margin-left: 10px;
}
.operation-container ::v-deep .el-checkbox {
  margin-right: 10px;
}
.operation-container ::v-deep .el-input-group--append .el-input__inner,
.operation-container ::v-deep .senior-btn,
.operation-container ::v-deep .el-button {
  height: 36px;
}
.operation-container ::v-deep .el-input__inner {
  text-indent: 20px;
}
.operation-container ::v-deep .el-input .el-input__icon {
  line-height: 36px;
}
</style>
