<template>
  <div>
    <div class="overview">
      <div class="overview-item">
        <div class="left" style="background-color: #fff1f1;color:#e46568;">
          <i class="el-icon-woneng-caiwu-yingli"></i>
        </div>
        <div class="right">
          <span class="num">{{dataObject.statistics.participateCount}}</span>
          <div class="smallTitle">总项目</div>
        </div>
      </div>
      <div class="overview-item">
        <div class="left" style="background-color: #fff1f1;color:#e46568;">
          <i class="el-icon-woneng-caiwu-yingli"></i>
        </div>
        <div class="right">
          <span class="num">{{dataObject.statistics.projectEnd}}</span>
          <div class="smallTitle">进行中项目</div>
        </div>
      </div>
      <div class="overview-item">
        <div class="left" style="background-color: #fff1f1;color:#e46568;">
          <i class="el-icon-woneng-caiwu-yingli"></i>
        </div>
        <div class="right">
          <span class="num">{{dataObject.statistics.failure}}</span>
          <div class="smallTitle">已完成项目</div>
        </div>
      </div>
      <div class="overview-item">
        <div class="left" style="background-color: #fff1f1;color:#e46568;">
          <i class="el-icon-woneng-caiwu-yingli"></i>
        </div>
        <div class="right">
          <span class="num">5</span>
          <div class="smallTitle">超时的项目</div>
        </div>
      </div>
      <div class="overview-item">
        <div class="left" style="background-color: #fff1f1;color:#e46568;">
          <i class="el-icon-woneng-caiwu-yingli"></i>
        </div>
        <div class="right">
          <span class="num">{{dataObject.statistics.processing}}</span>
          <div class="smallTitle">失败的项目</div>
        </div>
      </div>
      <div class="overview-item">
        <div class="left" style="background-color: #fff1f1;color:#e46568;">
          <i class="el-icon-woneng-caiwu-yingli"></i>
        </div>
        <div class="right">
          <span class="num">5</span>
          <div class="smallTitle">待办的项目</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataObject: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.overview {
  display: flex;
  flex-wrap: wrap;
  .overview-item {
    width: 15%;
    display: flex;
    margin-right: 1.5%;
    &:last-child {
      margin: 0;
    }
    .left {
      height: 60px;
      line-height: 60px;
      width: 60px;
      text-align: center;
      color: #fff;
      display: inline-block;
      border-radius: 50%;
      > i {
        font-size: 32px;
        height: 60px;
        line-height: 60px;
      }
    }
    .right {
      margin-left: 15px;
      .num {
        font-size: 22px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
      .smalltitle {
        color: $--color-text-secondary;
        font-size: 14px;
      }
    }
  }
}
</style>