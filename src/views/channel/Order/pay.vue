<template>
  <div class="order-background">
    <div class="order-container">
      <h2>订单支付</h2>
      <el-form class="iep-form-detail" :model="form" label-width="100px">
        <iep-form-item class="iep-form-half-block" label-name="支付方式">
          <div class="pay-type">
            <div
              v-if="['1','9'].includes(payOrder.payCurrency)"
              class="pay-type-item"
              :class="{active:payOrder.activePayMethod===1}"
              @click="payOrder.activePayMethod=1"
            >
              <i class="hook el-icon-woneng-gou1"></i>宝贝支付
            </div>
            <template v-if="['2','9'].includes(payOrder.payCurrency)">
              <div
                class="pay-type-item"
                :class="{active:payOrder.activePayMethod===2}"
                @click="payOrder.activePayMethod=2"
              >
                <i class="hook el-icon-woneng-gou1"></i>微信支付
              </div>
              <img
                v-if="payOrder.activePayMethod===2"
                style="height: 33px; margin-top: 5px; margin-left: 10px;"
                src="/img/nengbei/nbzs.png"
                alt
              />
            </template>
            <!-- <div
              class="pay-type-item"
              :class="{active:payOrder.activePayMethod===9}"
              @click="payOrder.activePayMethod=9"
            >
              <i class="hook el-icon-woneng-gou1"></i>线下支付
            </div>-->
          </div>
        </iep-form-item>
        <iep-form-item
          v-if="payOrder.activePayMethod===1"
          class="iep-form-half-block"
          label-name="支付密码"
        >
          <el-input placeholder="请输入密码" v-model="form.safePassword" show-password></el-input>
        </iep-form-item>
        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已认真阅读
            <el-link type="primary" :underline="false">《服务条款》</el-link>
          </el-checkbox>
        </el-form-item>
        <el-divider></el-divider>
        <div class="price-wrap">
          <div class="price">
            <span>
              <span v-if="payOrder.reduceType && payOrder.reduceType === '2'">折扣优惠：</span>
              <span v-else>合伙人优惠：</span>
              <span class="iep-red">-{{payOrder.getDeductible()}}{{payOrder.getUnit()}}</span>
            </span>
            <span>
              合计：
              <span class="iep-red">{{payOrder.getDiscount()}}{{payOrder.getUnit()}}</span>
            </span>
            <span v-show="payOrder.activePayMethod===2">
              赠：
              <span class="iep-red">{{payOrder.rechargeAmount}}宝贝</span>
            </span>
          </div>
        </div>
      </el-form>
    </div>
    <div class="submit-container">
      <el-button
        type="primary"
        class="iep-btn"
        size="medium"
        v-loading.fullscreen.lock="submitFormLoading"
        @click="handleSubmit()"
      >{{payOrder.activePayMethod===9?'确认':'支付订单'}}</el-button>
      <el-button class="iep-btn" size="medium" @click="handleBack()">取消支付</el-button>
    </div>
    <DialogWxpay ref="DialogWxpay"></DialogWxpay>
  </div>
</template>
<script>
import { encryption } from "@/util/util";
import {
  getPayOrderDetail,
  postPayOrder,
  orderAgentCheck,
} from "@/api/fms/order";
import DialogWxpay from "./DialogWxpay";
class PayOrderDTO {
  constructor({
    deductibleCash,
    discountCash,
    discountPrice,
    deductiblePrice,
    orderNumber,
    orderType,
    isChange,
    status,
    payCurrency,
    rechargeAmount,
    reduceType,
  }) {
    /**
     * 优惠了现金
     */
    this.deductibleCash = deductibleCash || 0;
    /**
     * 实际支付现金
     */
    this.discountCash = discountCash || 0;
    /**
     * 实际支付宝贝
     */
    this.discountPrice = discountPrice || 0;
    /**
     * 优惠了宝贝
     */
    this.deductiblePrice = deductiblePrice || 0;
    /**
     * 赠送了宝贝
     */
    this.rechargeAmount = rechargeAmount || 0;
    this.orderNumber = orderNumber || "";
    this.status = status || "";
    this.activePayMethod = payCurrency === "2" ? 2 : 1;
    this.orderType = orderType || "1";
    this.payCurrency = payCurrency || "9";
    this.isChange = isChange || false;
    this.reduceType = reduceType || "1";
  }
  getUnit() {
    return this.activePayMethod === 1 ? "贝" : "元";
  }
  getDeductible() {
    return this.activePayMethod === 1
      ? this.deductiblePrice
      : this.deductibleCash;
  }
  getDiscount() {
    return this.activePayMethod === 1 ? this.discountPrice : this.discountCash;
  }
}
const initForm = () => {
  return {
    safePassword: "",
    paymentMethod: "",
    orderNumber: "",
    checked: false,
  };
};
export default {
  components: {
    DialogWxpay,
  },
  data() {
    return {
      payOrder: new PayOrderDTO({}),
      form: initForm(),
      submitFormLoading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    handleWxpay() {
      this.$refs.DialogWxpay.orderNumber = this.payOrder.orderNumber;
      this.$refs.DialogWxpay.dialogShow = true;
    },
    async handleSubmit() {
      if (!this.form.checked) {
        this.$message("请先勾选《服务条款》");
        return;
      }
      if (this.payOrder.activePayMethod === 2) {
        this.handleWxpay();
        return;
      }
      this.form.orderNumber = this.payOrder.orderNumber;
      this.form.paymentMethod = this.payOrder.activePayMethod;
      if (
        !this.form.safePassword.trim() &&
        this.payOrder.activePayMethod === 1
      ) {
        this.$message("请输入支付密码");
        return;
      }
      const form = encryption({
        data: this.form,
        param: ["safePassword"],
      });
      this.submitFormLoading = true;
      const res = await orderAgentCheck(form.orderNumber);
      if (res.data === false) {
        const { data } = await postPayOrder(form);
        if (data) {
          this.$message("支付成功");
          // this.$openPage(`/channel/order/${this.$route.params.id}/result`);
          this.$router.replace({
            path: `/channel/order/${this.$route.params.id}/result`,
          });
        }
      } else {
        this.loadPage();
      }
      this.submitFormLoading = false;
    },
    async loadPage() {
      const { data } = await getPayOrderDetail(this.$route.params.id);
      this.payOrder = new PayOrderDTO(data);
      if (this.payOrder.isChange) {
        this.$message("合伙人价格发生变动, 请刷新页面");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.pay-type {
  display: flex;
  .pay-type-item {
    position: relative;
    padding: 0 26px;
    background: #fff;
    border: 1px solid $--border-color;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    .hook {
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: 12px;
      color: #fff;
    }
    &.active,
    &:hover {
      color: $--color-primary;
      border-color: $--color-primary;
      cursor: pointer;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 24px solid $--color-primary;
        border-left: 24px solid transparent;
      }
    }
    &.active {
      cursor: default;
    }
  }
  .pay-type-item + .pay-type-item {
    margin-left: 10px;
  }
}
.price-wrap {
  .price {
    text-align: right;
    font-size: 14px;
    .iep-red {
      font-size: 18px;
    }
  }
}
</style>
