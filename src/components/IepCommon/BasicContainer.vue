<template>
  <div class="basic-container">
    <el-card shadow="never" :body-style="bodyStyle">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "IepBasicContainer",
  data() {
    return {
      bodyStyle: {
        padding: 0,
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.basic-container {
  min-height: calc(100vh - 150px);
  padding: 20px 20px 40px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
  > .el-card {
    border: 0;
    border-radius: 0;
  }
}
</style>
