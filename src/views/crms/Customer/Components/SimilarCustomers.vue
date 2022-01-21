<template>
  <div>
    <div v-for="(item,index) in list" :key="index" class="s-item">
      <div class="title">舟山市大数据局</div>
      <div class="tags">
        <span class="level">区级</span>
        <span class="tag">城市案例</span>
        <span class="tag">大数据</span>
        <span class="tag">智慧方案</span>
      </div>
      <div class="comp">
        <span>舟山市营商环境评估</span>
        <i>|</i>
        <span>舟山市营商环境评估</span>
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
.s-item {
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
  .title {
    margin-bottom: 10px;
    font-size: 15px;
  }
  .tags {
    margin-bottom: 10px;
    font-size: 14px;
    .level {
      margin-right: 10px;
      color: $--color-primary;
    }
    .tag {
      padding: 3px 6px;
      border: 1px solid $--border-color;
      margin-right: 5px;
      color: $--color-text-secondary;
    }
  }
  .comp {
    font-size: 14px;
    i {
      display: inline-block;
      vertical-align: middle;
      height: 20px;
      line-height: 18px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      margin: 0 5px;
      height: 20px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>