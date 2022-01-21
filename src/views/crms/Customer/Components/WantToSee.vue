<template>
  <div>
    <div v-for="(item,index) in list" :key="index" class="w-item">
      <div class="title">
        <span class="level">市级</span> 舟山市大数据局
      </div>
      <div class="info">
        <div class="first-item">
          <span>客户类型：事业单位</span>
          <span>所在区域：浙江省杭州市</span>
        </div>
        <div class="line">所在行业：互联网·大数据·电子商务</div>
        <div class="tags">
          <span class="tag">城市案例</span>
          <span class="tag">大数据</span>
          <span class="tag">智慧方案</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ["", "", ""],
    };
  },
};
</script>
<style lang="scss" scoped>
.w-item {
  padding: 15px 0;
  width: 400px;
  overflow: hidden;
  border-bottom: 1px solid $--border-color;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
  .info {
    line-height: 28px;
  }
  .title {
    margin-bottom: 5px;
    font-size: 15px;
    .level {
      padding: 1px 3px;
      margin-right: 5px;
      font-size: 14px;
      color: $--color-primary;
      border: 1px solid $--color-primary;
      border-radius: 3px;
    }
  }
  .first-item {
    display: flex;
    justify-content: space-between;
    & > span {
      width: 50%;
      color: #aaa;
      font-size: 14px;
    }
  }
  .line {
    color: #aaa;
    font-size: 14px;
  }
  .tags {
    margin-bottom: 10px;
    font-size: 14px;
    &:last-child {
      margin-bottom: 0;
    }
    .level {
      color: $--color-primary;
    }
    .tag {
      padding: 3px 6px;
      border: 1px solid $--border-color;
      margin-right: 5px;
      color: $--color-text-secondary;
    }
  }
}
</style>