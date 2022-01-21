<template>
  <div class="activity-tag">
    <div class="banner-bg">
      <div class="banner-content">
        <div class="banner-content-txt">
          <div class="title">
            <span>节能保</span>
            <span>活动</span>
          </div>
          <p>以组织为核心，用协同社交的新方式，构建全新服务交流体验</p>
        </div>
        <iep-img class="banner-content-img" src="/img/banner/pic-meenting.png"></iep-img>
      </div>
    </div>
    <SearchFilter name="活动" @search-page="handleSearch"></SearchFilter>
    <div class="tag-content">
      <div></div>
      <div class="tag-other">
        <el-card class="code-box" shadow="never">
          <iep-img class="img" src></iep-img>
          <div class="txt-code">
            <span>微信扫一扫</span>
            <span>分享活动给朋友</span>
          </div>
        </el-card>
        <hot-tags></hot-tags>
        <guess-like></guess-like>
      </div>
    </div>
  </div>
</template>
<script>
// 活动标签页
import SearchFilter from "./Components/SearchFilter";
import HotTags from "./Components/HotTags";
import GuessLike from "./Components/GuessLike";
export default {
  name: "Tag",
  components: {
    SearchFilter,
    HotTags,
    GuessLike,
  },
  methods: {
    handleSearch() {},
  },
};
</script>
<style lang="scss" scoped>
.activity-tag {
  .tag-content {
    width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 274px;
    gap: 20px;
    .tag-other {
      display: grid;
      gap: 20px;
      grid-template-rows: 140px 270px 296px;
    }
  }
}
.banner-bg {
  height: 280px;
  width: 100%;
  background: url("/img//banner/bg-meeting.jpg") no-repeat;
  background-size: cover;
}
.banner-content {
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
  .banner-content-img {
    flex: 0 0 360px;
    width: 360px;
  }
}
</style>
