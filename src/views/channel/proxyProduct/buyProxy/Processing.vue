<template>
  <div>
    <banner></banner>
    <iep-basic-container>
      <div class="content-wrapper">
        <div class="ddxq">
          <h4>提交结果</h4>
          <img src="/img/proxy/ddxq.png" alt />
          <div>请尽快缴纳保证金，如已缴纳我们将尽快审核。</div>
        </div>
        <el-card shadow="never" style="margin-bottom: 20px;padding:0 20px;">
          <div class="box" style="border-bottom: 1px solid $--border-color;">
            <h4>对公账户信息</h4>
            <div class="account">
              <span class="account-name">公司名称：</span>
              <span>舟山网脉科技有限公司</span>
            </div>
            <div class="account">
              <span class="account-name">开户行：</span>
              <span>浙商银行股份有限公司舟山分行</span>
            </div>
            <div class="account">
              <span class="account-name">公司税号：</span>
              <span>税号91330901MA28K5CM7U</span>
            </div>
            <div class="account">
              <span class="account-name">银行账号：</span>
              <span>3420020010120100090747</span>
            </div>
          </div>
          <div class="box">
            <h4>联系方式</h4>
            <div class="contact-information">
              <div>
                <span class="contact-area">北京：</span>
                <span class="contact-name">李凯</span>
                <span class="contact-phone">13522763263</span>
              </div>
              <div>
                <span class="contact-area">上海：</span>
                <span class="contact-name">马春亮</span>
                <span class="contact-phone">13585633922</span>
              </div>
              <div>
                <span class="contact-area">广东：</span>
                <span class="contact-name">刘佳</span>
                <span class="contact-phone">18925175232</span>
              </div>
              <div>
                <span class="contact-area">深圳：</span>
                <span class="contact-name">阳和军</span>
                <span class="contact-phone">15011758853</span>
              </div>
            </div>
            <div class="contact-information">
              <div>
                <span class="contact-area">重庆：</span>
                <span class="contact-name">黄磊</span>
                <span class="contact-phone">13515806227</span>
              </div>
              <div>
                <span class="contact-area">浙江：</span>
                <span class="contact-name">王虎</span>
                <span class="contact-phone">13454072820</span>
              </div>
              <div>
                <span class="contact-area">浙江：</span>
                <span class="contact-name">楼晓燕</span>
                <span class="contact-phone">13967212711</span>
              </div>
              <div>
                <span class="contact-area">湖南：</span>
                <span class="contact-name">谢海艳</span>
                <span class="contact-phone">15273455628</span>
              </div>
            </div>
            <div class="contact-information">
              <div>
                <span class="contact-area">海南：</span>
                <span class="contact-name">邢芬芬</span>
                <span class="contact-phone">13976569936</span>
              </div>
              <div>
                <span class="contact-area">江苏：</span>
                <span class="contact-name">马思宏</span>
                <span class="contact-phone">15951611566</span>
              </div>
              <div>
                <span class="contact-area">江西：</span>
                <span class="contact-name">龙艳华</span>
                <span class="contact-phone">13307912312</span>
              </div>
              <div>
                <span class="contact-area">吉林：</span>
                <span class="contact-name">董颖</span>
                <span class="contact-phone">13843061971</span>
              </div>
            </div>
            <div class="contact-information">
              <div>
                <span class="contact-area">河北：</span>
                <span class="contact-name">郑鑫宁</span>
                <span class="contact-phone">13810602670</span>
              </div>
              <div>
                <span class="contact-area">青海：</span>
                <span class="contact-name">黄成祥</span>
                <span class="contact-phone">18997234723</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import Banner from "./Banner";
export default {
  components: { Banner },
  data() {
    return {
      active: 1,
    };
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.ddxq {
  margin: 20px auto 30px;
  text-align: center;
  h4 {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 30px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  img {
    width: 150px;
  }
}
.box {
  overflow: hidden;
  padding-bottom: 30px;
  margin-bottom: 30px;
  > h4 {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
  }
  .account {
    width: 50%;
    height: 28px;
    line-height: 28px;
    float: left;
    .account-name {
      display: inline-block;
      width: 80px;
      text-align: left;
      color: #777;
    }
  }
  :last-child {
    border-right: 0;
  }
  .contact-information {
    border-right: 1px solid $--border-color;
    float: left;
    width: 24%;
    padding: 0 10px;
    .contact-area {
      display: inline-block;
      width: 70px;
      height: 28px;
      line-height: 28px;
      text-align: right;
      color: #777;
    }
    .contact-name {
      display: inline-block;
      width: 50px;
      height: 28px;
      line-height: 28px;
    }
    .contact-phone {
      display: inline-block;
      height: 28px;
      line-height: 28px;
    }
  }
}
:last-child {
  margin-bottom: 0;
}
.steps-wrapper {
  margin: 30px 0;
}
.content-wrapper {
  margin: 20px 60px;
}

.steps-wrapper ::v-deep .el-step__icon.is-text {
  width: 30px;
  height: 30px;
  border-width: 1px;
}
.steps-wrapper ::v-deep .is-process .el-step__icon.is-text {
  background-color: #e24f55;
  border-color: #fcfcfc;
  color: #fff;
}
.steps-wrapper ::v-deep .el-step__title {
  font-size: 14px;
  font-weight: 400;
}
.steps-wrapper ::v-deep .is-wait .el-step__icon.is-text {
  font-family: "微软雅黑";
  background-color: #f0f0f0;
  border-color: #f0f0f0;
  color: $--color-text-primary;
}
.steps-wrapper ::v-deep .is-success .el-step__icon.is-text {
  background-color: #f6ebe9;
}
.steps-wrapper ::v-deep .el-step__icon-inner {
  font-size: 16px;
  font-weight: 400;
}
.steps-wrapper ::v-deep .el-step.is-horizontal .el-step__line {
  height: 1px;
}
.steps-wrapper ::v-deep .el-step.is-horizontal .is-success .el-step__line {
  background-color: #e24f55;
}
.steps-wrapper ::v-deep .el-step__head.is-success {
  border-color: #e24f55;
  color: #e24f55;
}
.steps-wrapper::v-deep .el-step__icon.is-success {
  background: #f6ebe9;
}
.steps-wrapper::v-deep .el-step__title.is-success {
  color: #e24f55;
}
.content-wrapper ::v-deep h1 {
  margin-bottom: 20px;
}
</style>
