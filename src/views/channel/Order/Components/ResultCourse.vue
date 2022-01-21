<template>
  <div class="order-container">
    <div class="tip-wrap">
      <el-button class="back-btn" type="default" @click="$router.go(-1)">返回</el-button>
      <i class="el-icon-woneng-chenggong2shixin"></i>
      <span>{{form.paymentMethod==9 ? '您的预订单已提交' : '您已成功付款'}}</span>
    </div>
    <div class="result-wrap">
      <!-- 订单详情 -->
      <div class="detail-wrap">
        <div class="result-list">
          <div class="result-item">
            <span>实付金额：</span>
            <span class="iep-red">{{price}}</span>
          </div>
          <div class="result-item">
            <span>订单号：</span>
            <span>{{form.orderNumber}}</span>
          </div>
          <div class="result-item">
            <span>创建时间：</span>
            <span>{{form.createTime}}</span>
          </div>
        </div>
        <div class="you-can">
          <span>您可以：</span>
          <span @click="$openPage(`/channel/course/detail/${form.id}`)">查看买到的课程</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="$openPage(`/my/index/order/${form.orderNumber}`)">查看交易详情</span>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return this.form.paymentMethod === "1"
        ? this.form.discountPrice + "贝"
        : this.form.discountCash + "元";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
.back-btn {
  align-self: flex-end;
}
.tip-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding-top: 30px;
  i {
    margin-bottom: 15px;
    font-size: 75px;
    color: #3cd489;
  }
  span {
    font-size: 20px;
    font-family: Microsoft YaHei;
    color: #303031;
  }
}
.result-wrap {
  margin-bottom: 60px;
  padding: 0 140px;
  font-size: 14px;
  color: $--color-text-regular;
  .detail-wrap {
    .result-list {
      display: grid;
      gap: 10px 20px;
      grid-template-columns: auto auto;
      margin: 40px auto;
      width: 700px;
      .result-item {
        span {
          display: inline-block;
          vertical-align: top;
          text-align: right;
          &:nth-child(1) {
            width: 70px;
          }
          &:nth-child(2) {
            max-width: 260px;
            text-align: left;
          }
        }
      }
    }

    .you-can {
      margin: 0 auto;
      width: 700px;
      span {
        display: inline-block;
        text-align: right;
        height: 14px;
        line-height: 14px;
        &:nth-child(1) {
          width: 70px;
        }
        &:nth-child(n + 2) {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            color: $--color-primary;
          }
        }
      }
    }
  }
}
</style>
