<template>
  <div>
    <div class="title">Ta的信息</div>
    <div class="info-con">
      <p>工作地：{{form.workPlace | showText}}</p>
      <p>邮箱地址：{{form.mail | showText}}</p>
      <p>电话：{{form.mobile | showText}}</p>
      <p>QQ号：{{form.qq | showText}}</p>
      <p>微信号：{{form.weiXin | showText}}</p>
    </div>
  </div>
</template>
<script>
class UserInfoDTO {
  workPlace = "";
  mail = "";
  mobile = "";
  weiXin = "";
  qq = "";
}
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    form() {
      return this.$mergeByFirst(new UserInfoDTO(), this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.info-con {
  margin-top: -15px;
  p {
    margin: 0;
    font-size: 14px;
    line-height: 36px;
    color: #666769;
  }
}
</style>
