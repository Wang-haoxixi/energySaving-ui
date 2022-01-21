<template>
  <iep-card shadow="never">
    <div class="info-wrapper">
      <div class="info-box">
        <h3>收货人信息</h3>
        <div class="info-grid-box">
          <div class="info">
            <span class="label">收货人：</span>
            <span class="value">{{form.consignee|showText}}</span>
          </div>
          <div class="info">
            <span class="label">联系方式：</span>
            <span class="value">{{form.contact|showText}}</span>
          </div>
          <div class="info">
            <span class="label">邮箱：</span>
            <span class="value">{{form.mail|showText}}</span>
          </div>
          <div class="info">
            <span class="label">地址：</span>
            <span class="value">{{form.address|showText}}</span>
          </div>
          <div class="info">
            <span class="label">邮编：</span>
            <span class="value">{{form.zipCode|showText}}</span>
          </div>
        </div>
      </div>
      <div class="info-box">
        <h3>支付信息</h3>
        <div class="info-grid-box">
          <div class="info">
            <span class="label">支付方式：</span>
            <span class="value">{{dictsMap.paymentMethod[form.paymentMethod]|showText}}</span>
          </div>
          <div class="info">
            <span class="label">流水单号：</span>
            <span class="value">{{form.paymentNumber|showText}}</span>
          </div>
          <div class="info">
            <span class="label">创建时间：</span>
            <span class="value">{{form.createTime|parseToTimeMinutes|showText}}</span>
          </div>
          <div class="info">
            <span class="label">支付时间：</span>
            <span class="value">{{form.finishTime|parseToTimeMinutes|showText}}</span>
          </div>
          <div class="info">
            <span class="label">完成时间：</span>
            <span class="value">{{form.finishTime|parseToTimeMinutes|showText}}</span>
          </div>
        </div>
      </div>
    </div>
  </iep-card>
</template>
<script>
import { dictsMap } from "../options";
export default {
  name: "OrderInfo",
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dictsMap,
    };
  },
};
</script>
<style lang="scss" scoped>
.info-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  .info-box {
    h3 {
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .info-grid-box {
      color: $--color-text-secondary;
      .info {
        display: grid;
        grid-template-columns: 100px 1fr;
        font-size: 14px;
        margin: 10px 0;
        .value {
          word-break: break-all;
        }
      }
    }
  }
}
</style>