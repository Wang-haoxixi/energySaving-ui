<template>
  <div class="app-store">
    <div class="app-store-top">
      <el-carousel trigger="click" height="440px">
        <el-carousel-item v-for="(banner, index) in bannerList" :key="index" class="app-store-banner" :style="`background-image:url('${banner.bg}')`">
        </el-carousel-item>
      </el-carousel>
    </div>
    <search-box></search-box>
    <all-list></all-list>
  </div>
</template>
<script>
import SearchBox from "./SearchBox";
import AllList from "./AllList";
export default {
  components: {
    SearchBox,
    AllList,
  },
  data() {
    return {
      bannerList: [
        {
          bg: "/img/banner/app_store_banner.jpg",
          title: "",
          text: "",
          sublime: "立即咨询",
        },
      ],
    };
  },
  methods: {
    jumpUrl(url) {
      if (url) {
        this.$openPage(url);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-store {
  background-color: #fff;
}
.app-store-top {
  width: 100%;
  height: 440px;
  .app-store-banner {
    cursor: pointer;
    width: 100%;
    height: 440px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    .main {
      width: 1200px;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -70%);
      padding-left: 140px;
    }
  }
}
.app-store-top ::v-deep .el-carousel__item {
  display: block !important;
}
.app-store-top ::v-deep .el-carousel__arrow {
  top: 40%;
}
.app-store-top ::v-deep .el-carousel__indicators {
  bottom: 70px;
}
.app-store-top ::v-deep .el-carousel__button {
  height: 4px;
  border-radius: 4px;
  background-color: $--color-primary;
}
</style>
