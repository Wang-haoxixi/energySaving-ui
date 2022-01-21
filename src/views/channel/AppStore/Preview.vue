<template>
  <div class="preview-box">
    <div class="sub-title">应用预览</div>
    <iep-no-data v-if="!fileList.length"></iep-no-data>
    <el-carousel v-else :interval="5000" arrow="always">
      <el-carousel-item
        v-for="(banner, index) in fileList"
        :key="index"
        class="preview-box-banner"
        :style="`background-image:url('${banner.url}')`"
      ></el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.preview-box {
  padding-top: 20px;
  margin-bottom: 20px;
  .sub-title {
    margin-bottom: 20px;
  }
  .preview-box-banner {
    margin-top: 90px;
    margin-left: 90px;
    width: 800px;
    height: 450px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    cursor: pointer;
  }
}
.el-carousel {
  margin: 0 auto;
  margin-top: -44px;
}
.preview-box ::v-deep .el-carousel__container {
  height: 550px;
}
.preview-box ::v-deep .el-carousel__arrow {
  top: 60%;
  height: 44px;
  width: 44px;
  background-color: #f8f8f8;
}
.preview-box ::v-deep .el-carousel__arrow i {
  font-size: 24px;
  color: $--color-input-regular;
}
.preview-box ::v-deep .el-carousel__indicators {
  bottom: inherit;
  left: inherit;
  right: 0;
  transform: translateX(-50%);
  top: 0;
  z-index: 1000;
}
.preview-box ::v-deep .el-carousel__button {
  width: 6px;
  height: 6px;
  background-color: $--color-primary;
  border-radius: 50%;
}
.preview-box ::v-deep .el-carousel__indicator.is-active button {
  width: 8px;
  height: 8px;
}
</style>
