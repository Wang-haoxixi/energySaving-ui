<template>
  <div class="body">
    <!-- 头部banner图 -->
    <div class="banner">
      <div class="banner-con">
        <div class="title-block">
          <h3 class="title">
            <strong>材料</strong>
            <i></i>
            共享
          </h3>
          <p class="sub-title">分享文档，发现价值，实现知识进步</p>
        </div>
        <div class="banner-decorate">
          <iep-img class="img" src="/img/banner/banner-pic.png"></iep-img>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <div class="search-content">
        <div class="search-card">
          <el-input
            placeholder="输入关键词进行搜索"
            v-model="searchValue"
            prefix-icon="el-icon-woneng-chazhao"
            @keyup.enter.native="handleSearch"
          ></el-input>
          <iep-button class="button" @click="handleSearch">搜索</iep-button>
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <div class="content">
      <leftTpl class="left" ref="left"></leftTpl>
      <rightTpl class="right" ref="right"></rightTpl>
    </div>
  </div>
</template>
<script>
import leftTpl from "./left/index";
import rightTpl from "./right/index";

export default {
  components: { leftTpl, rightTpl },
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    handleSearch() {
      this.$refs.left.searchPage({ materialName: this.searchValue });
    },
  },
};
</script>
<style lang="scss" scoped>
.body {
  .banner {
    display: flex;
    align-items: center;
    height: 280px;
    background-image: url("/img/banner/banner-bg.jpg");
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
    .banner-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      width: 1200px;
    }
    .title-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10%;
      .title {
        margin: 0;
        font-size: 28px;
        strong {
          font-weight: 400;
          color: #f74437;
        }
        i {
          display: inline-block;
          margin: 0 3px 0 10px;
          width: 6px;
          height: 6px;
          vertical-align: middle;
          border-radius: 50%;
          background-color: #666769;
        }
      }
      .sub-title {
        margin-top: 10px;
        font-size: 20px;
        color: #666769;
      }
    }
    .banner-decorate {
      margin-right: 6.2%;
      width: 500px;
    }
  }
  .search {
    height: 60px;
    .search-content {
      position: relative;
      width: 800px;
      margin: auto;
      box-sizing: border-box;
      .search-card {
        width: 100%;
        height: 80px;
        border-radius: 10px;
        position: absolute;
        line-height: 40px;
        top: -40px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 $--background-color;
        box-sizing: border-box;
        display: flex;
        .button {
          margin-left: 10px;
          min-width: 80px;
          width: 80px;
          height: 40px;
          background-color: $--color-primary;
          border-color: $--color-primary;
          color: #fff;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
  .content {
    margin: 20px auto 40px;
    width: 1200px;
    background-color: #fff;
    display: flex;
    .left {
      width: calc(100% - 320px);
      background-color: #fff;
      margin-right: 20px;
    }
    .right {
      width: 300px;
    }
  }
}
</style>
