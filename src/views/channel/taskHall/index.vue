<template>
  <div class="body">
    <!-- 头部banner图 -->
    <div class="banner">
      <div class="banner-con">
        <div class="title-block">
          <h3 class="title">
            高效
            <strong>协作</strong>
          </h3>
          <p class="sub-title">通过专业用户协作，任务轻松解决，让天下无难事</p>
        </div>
        <div class="banner-decorate">
          <iep-img class="img" src="/img/banner/gcpic.png"></iep-img>
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
    <!-- 最受关注的任务 -->
    <div class="most-concerned" v-show="false">
      <ConcernedTpl ref="concerned"></ConcernedTpl>
    </div>
    <!-- 主体 -->
    <div class="content">
      <TaskLeft class="left" ref="left"></TaskLeft>
      <TaskRight class="right" ref="right"></TaskRight>
    </div>
  </div>
</template>
<script>
import TaskLeft from "./taskLeft/index";
import TaskRight from "./taskRight/index";
import ConcernedTpl from "./components/concerned";

export default {
  components: { TaskLeft, TaskRight, ConcernedTpl },
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    handleSearch() {
      this.$refs.left.searchPage({ name: this.searchValue });
    },
  },
  created() {
    this.searchValue = this.$route.query.name || "";
  },
};
</script>
<style lang="scss" scoped>
.body {
  .banner {
    display: flex;
    align-items: center;
    height: 280px;
    background-image: url("/img/banner/rwbanner.png");
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
        font-size: 40px;
        strong {
          font-weight: 400;
          color: #f74437;
        }
      }
      .sub-title {
        margin-top: 10px;
        font-size: 18px;
        color: #666769;
      }
    }
    .banner-decorate {
      margin-top: 30px;
      margin-right: 6.2%;
      width: 400px;
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
  .most-concerned {
    margin-top: 60px;
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
