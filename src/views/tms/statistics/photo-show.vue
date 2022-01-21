<template>
  <div class="tag-photo-box">
    <h2>标签生命周期</h2>
    <div class="tag-wrapper" style="height: 275px;">
      <el-image style="width: 100%; height: 300px" src="/img/back/example.png" fit="fill"></el-image>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tag-photo-box {
  .tag-wrapper {
    img {
      height: 100%;
      width: 100%;
    }
  }
}
h2 {
  font-size: 18px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
</style>
