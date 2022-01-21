<template>
  <div class="error404">
    <div class="error404-body-con">
      <div class="error404-btn-con">
        <iep-button @click="goHome" size="large" style="width: 200px;" type="default">返回首页</iep-button>
        <iep-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  methods: {
    backPage() {
      this.$router.go(-2);
    },
    goHome() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.error404 {
  &-body-con {
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("/img/error-page/404.jpg") no-repeat center;
  }
  &-btn-con {
    text-align: center;
    padding: 20px 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    bottom: 0;
  }
}
</style>
