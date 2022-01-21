<template>
  <div>
    <div class="banner">
      <div class="banner-center">
        <div class="left">
          <!-- <h2 class="banner-center-title">We can VIP</h2> -->
          <h2 class="banner-center-title">energy efficiency VIP</h2>
          <p>
            开放+赋能+协作
            <span class="right-text">全域节能，科技臻善！</span>
          </p>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="aside">
        <Menu prefix-url="/my/index/" :routerList="indexRouter"></Menu>
      </div>
      <div class="container">
        <transition name="fade-up-in-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { indexRouter } from "../../index/router";
import Menu from "./menu";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      indexRouter,
    };
  },
};
</script>
<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  height: 200px;
  background-image: url("/img/banner/banner_index.jpg");
  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  .banner-center {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    width: 1200px;
    .left {
      margin-left: 244px;
      color: #fff;
      font-size: 18px;
      .right-text {
        margin-left: 10px;
        font-size: 16px;
      }
      .banner-center-title {
        margin-bottom: 20px;
        font-size: 30px;
        line-height: 32px;
        color: #fff;
      }
      p {
        font-size: 18px;
      }
    }
    &::after {
      position: absolute;
      top: -28px;
      right: 0;
      content: "";
      width: 434px;
      height: 240px;
      background-image: url("/img/banner/index_banner_right.png");
      background-position-x: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
}
.main {
  position: relative;
  margin: 20px auto;
  width: 1200px;
  display: grid;
  grid-template-columns: 220px 980px;
  .aside {
    height: calc(100vh - 95px);
  }
}
</style>
