<template>
  <div>
    <div v-for="(item,index) in list" :key="index" class="p-item">
      <div class="title">舟山市大数据局</div>
      <div class="tags">
        <span class="tag">城市案例</span>
        <span class="tag">大数据</span>
        <span class="tag">智慧方案</span>
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
.p-item {
  padding: 15px 0 18px;
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
    &:last-child {
      margin-bottom: 0;
    }
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
}
</style>