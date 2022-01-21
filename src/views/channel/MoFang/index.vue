<template>
  <div class="wrap">
    <div class="banner">
      <div class="proxy-top">
        <div class="content-text" @click="handleOpenVip()">
          <div class="title">
            <div>
              节能保
              <strong>魔方</strong>
              <i class="el-icon-woneng-dian"></i>
              <span>遇见节能保 预购未来</span>
            </div>
          </div>
          <div class="describe">争做节能保合伙人，千万宝贝大赠送</div>
        </div>
      </div>
      <div class="proxy-float">
        <div class="proxy-float-box" @click="$openPage('/cpms/product')">
          <IepIcon
            icon="el-icon-woneng-yqhy"
            aColor="rgba(255,167,113,1)"
            bColor="rgba(255,54,20,1)"
          ></IepIcon>
          <div class="float-right">
            <span>产品发布</span>
            <span>发布产品至节能保</span>
          </div>
        </div>
        <div class="proxy-float-box" @click="$openPage('/cpms/product_edit/0?type=0')">
          <IepIcon
            icon="el-icon-woneng-fangan"
            aColor="rgba(144,220,255,1)"
            bColor="rgba(20,116,255,1)"
          ></IepIcon>
          <div class="float-right">
            <span>方案设计</span>
            <span>结合产品成方案</span>
          </div>
        </div>
        <div class="proxy-float-box" @click="$openPage('/channel/app_store')">
          <IepIcon
            icon="el-icon-woneng-shangchengxiantiao"
            aColor="rgba(135,235,237,1)"
            bColor="rgba(32,215,168,1)"
          ></IepIcon>
          <div class="float-right">
            <span>应用商城</span>
            <span>获取组织应用模块</span>
          </div>
        </div>
        <div class="proxy-float-box" @click="$openPage('/channel_proxyProduct/buy_proxy')">
          <IepIcon
            icon="el-icon-woneng-daili"
            aColor="rgba(255,226,144,1)"
            bColor="rgba(255,160,20,1)"
          ></IepIcon>
          <div class="float-right">
            <span>申请合伙</span>
            <span>加盟节能保合伙人</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <CreativeProgram></CreativeProgram> -->
    <HotRecommand></HotRecommand>
  </div>
</template>
<script>
// import CreativeProgram from "./Components/CreativeProgram";
import HotRecommand from "./Components/HotRecommand";
export default {
  components: {
    // CreativeProgram,
    HotRecommand,
  },
  methods: {
    handleOpenVip() {
      this.$openPage("/my/index/proxy");
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow: hidden;
}
.banner {
  .proxy-top {
    height: 280px;
    background-image: url("/img/product/mfbg.png");
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
    .content-text {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin: 0 auto;
      width: 1050px;
      height: 240px;
      background: url("/img/product/mft.png");
      background-position-x: right;
      background-position-y: bottom;
      background-repeat: no-repeat;
      background-size: auto 90%;
    }
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      & > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 40px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
      strong {
        font-weight: 400;
        color: $--color-primary;
      }
      i {
        margin: 0 5px;
        font-size: 36px;
        color: $--color-primary;
      }
      span {
        display: inline-block;
        margin-left: 10px;
        font-size: 22px;
        font-weight: 300;
        color: $--color-text-regular;
      }
    }
    .describe {
      margin-top: 10px;
      font-size: 18px;
      color: $--color-text-regular;
    }
  }
  .proxy-float {
    position: relative;
    width: 1200px;
    margin: -50px auto 0;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 $--background-color;
    display: flex;
    z-index: 100;
    .proxy-float-box {
      display: flex;
      // justify-content: center;
      align-items: center;
      width: 33.3333333%;
      height: 80px;
      padding: 15px;
      cursor: pointer;
      box-sizing: border-box;
      &:hover {
        background-color: $--background-color;
      }
      i {
        font-size: 32px;
        color: #fff;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-size: cover;
      }
      &:nth-of-type(1) i {
        background-image: url("/img/icon-bg/icon-bg-3.png");
      }
      &:nth-of-type(2) i {
        background-image: url("/img/icon-bg/icon-bg-1.png");
      }
      &:nth-of-type(3) i {
        background-image: url("/img/icon-bg/icon-bg-2.png");
      }
      &:nth-of-type(4) i {
        background-image: url("/img/icon-bg/icon-bg-4.png");
      }
      .float-right {
        margin-left: 15px;
        span:first-child {
          display: block;
          font-size: 16px;
          height: 34px;
          line-height: 34px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
        span:last-child {
          display: block;
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-family: "微软雅黑";
          color: $--color-text-secondary;
        }
      }
    }
  }
}
::v-deep .icon-wrap {
  width: 50px;
  height: 50px;
  .icon-box {
    font-size: 32px;
    width: 32px;
    height: 32px;
    margin-left: -16px;
    margin-top: -16px;
  }
}
</style>
