<template>
  <div class="about-container">
    <div class="banner">
      <div class="banner-box">
        <div class="banner-plain">
          <div class="banner-title">
            <p class="big-title">节能宝，全域节能，科技臻善！</p>
            <p>任务智能协作和组织智慧创新平台</p>
            <el-button class="iep-btn-long-round" type="primary" @click="$openPage('/')">立即体验</el-button>
          </div>
        </div>
        <div class="banner-decorate">
          <iep-img class="img" src="/img/about/banner_pic.png"></iep-img>
        </div>
      </div>
    </div>
    <tab></tab>
    <div class="con">
      <service></service>
      <app></app>
    </div>
  </div>
</template>
<script>
import Tab from "./Tab";
import Service from "./Service";
import App from "./App";
export default {
  components: {
    Tab,
    Service,
    App,
  },
};
</script>
<style lang="scss" scoped>
.about-container {
  position: relative;
  background: #fff;
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 530px;
    background-image: url(/img/about/cpsybg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .banner-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      width: 1200px;
    }
    .banner-decorate {
      width: 600px;
    }
    .banner-plain {
      margin-bottom: 50px;
    }
    p {
      margin-bottom: 35px;
      font-size: 20px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .big-title {
      margin: 0 0 20px;
      font-size: 38px;
      line-height: 44px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
  }
  .con {
    background-image: url("/img/about/bgccon.png");
    background-position-x: center;
    background-position-y: top;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.iep-btn-long-round {
  padding: 0;
  width: 148px;
  height: 44px;
  text-align: center;
  font-size: 16px;
  line-height: 44px;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(26, 98, 11, 0.2);
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(13, 101, 33, 0.5);
  }
}
</style>
