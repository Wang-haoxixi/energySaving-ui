<template>
  <div class="certification">
    <div v-if="certificationState">
      <img src="/img/front/certification-failed.png" alt />
      <span class="desc">很抱歉，您尚未认证</span>
      <div>
        <el-button type="danger">立即认证</el-button>
        <el-button type="danger" plain>查看认证权益</el-button>
      </div>
    </div>
    <div v-else>
      <img src="/img/front/certification-succeed.png" alt />
      <span class="desc">恭喜您，已完成认证</span>
      <div>
        <!-- <el-button>立即认证</el-button> -->
        <el-button type="danger" plain>查看认证权益</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      certificationState: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.certification {
  background-color: #fff;
  margin-top: 50px;
  padding: 30px 20px 200px;
  text-align: center;
  .desc {
    display: block;
    font-size: 20px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    margin: 20px 0 30px;
  }
}
.el-button {
  width: 120px;
  height: 40px;
  line-height: 14px;
  text-align: center;
}
</style>
