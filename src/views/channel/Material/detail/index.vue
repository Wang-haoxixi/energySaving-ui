<template>
  <div class="material-body">
    <div class="material-detail">
      <!-- 主区域 -->
      <div class="left">
        <DetailTpl ref="detail"></DetailTpl>
      </div>
      <!-- 右侧推荐位 -->
      <div class="right">
        <HotTpl></HotTpl>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTpl from "@/views/mlms/material/detail";
import HotTpl from "./hot";
export default {
  components: { DetailTpl, HotTpl },
  beforeRouteUpdate(to, from, next) {
    this.$refs.detail.open(to.params.id);
    next();
  },
};
</script>

<style lang="scss" scoped>
.material-body {
  background-color: $--background-color;
  .material-detail {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: auto;
    padding: 25px;
    .left {
      width: calc(100% - 320px);
    }
    .right {
      background-color: $--background-color;
      width: 300px;
      border-radius: 10px;
      .tpl {
        margin-bottom: 20px;
        border-radius: 10px;
        border: 0;
      }
    }
  }
}
</style>