<template>
  <div class="router-view-box">
    <div class="card-center">
      <slot name="header"></slot>
      <el-divider></el-divider>
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/*创建组织页容器*/
.router-view-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $--background-color;
}
.card-center {
  margin: 30px 0;
  padding: 20px;
  width: 530px;
  background-color: #fff;
  border: 1px solid $--border-color;
  text-align: center;
  // margin: 20px auto calc(50vh - 280px);
  // margin: max(calc(50vh - 400px), 40px) auto;
  border-radius: $--border-radius-base;
}
</style>
