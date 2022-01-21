<template>
  <div>
    <div v-for="(item,index) in list" :key="index" class="i-item">
      <div class="logo"></div>
      <div class="info">
        <div class="title">数据元加工系统</div>
        <div class="des">数据元池应用服务，系统字段标准化校验等</div>
        <div class="use">{{12}}人在用</div>
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
.i-item {
  display: flex;
  align-items: center;
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
  .logo {
    display: inline-block;
    margin-right: 10px;
    width: 60px;
    min-width: 60px;
    height: 60px;
    border: 1px solid $--border-color;
    border-radius: $--small-border-radius;
  }
  .info {
    display: inline-block;
    max-width: 330px;
    line-height: 22px;
    .title {
      font-size: 15px;
    }
    .des {
      font-size: 14px;
      color: $--color-text-secondary;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .use {
      font-size: 14px;
      color: $--color-input-regular;
    }
  }
}
</style>