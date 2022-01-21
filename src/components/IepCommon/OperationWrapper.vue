<template>
  <div class="operation-wrapper" @click.stop>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "IepOperationWrapper",
};
</script>

<style lang="scss" scoped>
.operation-wrapper {
  align-items: center;
}
.operation-wrapper > * {
  margin-right: 10px;
  margin-bottom: 0;
  &:last-child {
    margin-right: 0;
  }
}
.operation-wrapper ::v-deep .el-button {
  height: 36px;
  border-radius: $--border-radius-base;
}
.operation-wrapper ::v-deep .iep-back-btn {
  &:hover {
    border-color: $--background-color;
    background-color: $--background-color;
    color: $--color-text-primary;
  }
  &:focus {
    border-color: #efefef;
    background-color: #efefef;
    color: $--color-text-primary;
  }
}
</style>
