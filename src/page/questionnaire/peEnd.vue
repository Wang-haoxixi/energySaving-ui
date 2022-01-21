<template>
  <div class="end-wrapper">
    <div class="end-top">
      <i class="el-icon-woneng-chenggong2shixin success"></i>
      <span>答卷成功，感谢您的帮助与支持！</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.end-wrapper,
.end-top {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.end-wrapper {
  height: calc(100vh - 250px);
  justify-content: center;
  .end-top {
    i {
      margin-bottom: 15px;
      font-size: 75px;
      &.success {
        color: $--color-third;
      }
      &.error {
        color: $--color-text-regular;
      }
    }
  }
  .tips {
    margin-top: 30px;
  }
}
</style>
