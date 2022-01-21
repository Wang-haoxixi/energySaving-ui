<template>
  <div class="carousel-banner-box">
    <el-carousel height="280px">
      <el-carousel-item v-for="item in 1" :key="item">
        <div class="carousel-banner-bg">
          <div class="carousel-banner-content">
            <div class="carousel-banner-content-txt">
              <div class="title">
                <span>节能保</span>
                <span>活动</span>
              </div>
              <p>以组织为核心，用协同社交的新方式，构建全新服务交流体验</p>
            </div>
            <iep-img
              :resizeOpt="{l:500}"
              class="carousel-banner-content-img"
              src="/img/banner/pic-meenting.png"
            ></iep-img>
            <iep-img
              :resizeOpt="{l:190}"
              class="carousel-banner-small-img"
              src="/img/banner/zan-meeting.png"
            ></iep-img>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Banner",
};
</script>
<style lang="scss" scoped>
.carousel-banner-box {
  .carousel-banner-bg {
    height: 280px;
    width: 100%;
    background: url("/img//banner/bg-meeting.jpg") no-repeat;
    background-size: cover;
  }
  .carousel-banner-content {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    width: 1200px;
    height: 280px;
    .title {
      margin-bottom: 30px;
      font-size: 40px;
      height: 40px;
      line-height: 40px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      span:nth-child(2) {
        color: #f74437;
      }
    }
    p {
      font-size: 18px;
      height: 18px;
      line-height: 18px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .carousel-banner-content-img {
      flex: 0 0 500px;
      width: 500px;
    }
    .carousel-banner-small-img {
      position: absolute;
      top: 100px;
      left: 200px;
      width: 190px;
      height: 134px;
    }
  }
  ::v-deep {
    .el-carousel__button {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 1);
      opacity: 0.3;
      border-radius: 4px;
    }
    .is-active .el-carousel__button {
      width: 30px;
      height: 8px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      opacity: 1;
    }
  }
}
</style>
