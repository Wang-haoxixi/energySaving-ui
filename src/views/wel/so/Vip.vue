<template>
  <div class="vip-box box" @click="$openPage('/my/cyberstar')"></div>
</template>
<style lang="scss" scoped>
@import "./common.scss";
.vip-box {
  background-image: url("/img/back/vip.png");
  background-size: cover;
  cursor: pointer;
  text-align: center;
  border: 0;
  &:hover {
    opacity: 0.7;
  }
}
</style>
