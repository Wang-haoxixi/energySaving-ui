<template>
  <iep-card :title="title" shadow="never">
    <iep-table
      :columnsMap="columnsMapProduct"
      :dictsMap="dictsMap"
      :isLoadTable="false"
      :pagedTable="[form]"
      :is-pagination="false"
    >
      <template #goods="{scope}">
        <iep-table-link-img-desc
          @m-click="handleClick(scope.row)"
          :img="scope.row.goodsImg"
          :name="scope.row.goods"
        ></iep-table-link-img-desc>
      </template>
      <template #price="{scope}">{{moneyJoin(scope.row.priceAmount,scope.row.cashAmount)}}</template>
      <!-- <template
        #priceToDiscount="{scope}"
      >{{moneyJoin(scope.row.differencePrice,scope.row.differenceCash)}}</template>-->
      <template
        #discount="{scope}"
      >{{moneyJoin(scope.row.deductiblePrice,scope.row.deductibleCash)}}</template>
      <template #status="{scope}">
        <div
          :style="{color:orderStatus(scope.row.status).color}"
        >{{orderStatus(scope.row.status).label}}</div>
      </template>
    </iep-table>
    <el-divider></el-divider>
    <div class="footer">
      <div>
        <span>原价：</span>
        <span>{{moneyJoin(form.priceAmount,form.cashAmount)}}</span>
      </div>
      <div>
        <span>合伙人优惠：</span>
        <span>{{realDeductible(form)}}</span>
      </div>
      <div>
        <span>实付金额：</span>
        <span>{{realPay(form)}}</span>
      </div>
      <div v-if="form.rechargeAmount">
        <span>赠送宝贝：</span>
        <span>{{form.rechargeAmount}}贝</span>
      </div>
    </div>
  </iep-card>
</template>
<script>
import {
  columnsMapProduct,
  dictsMap,
  statusColor,
  jumpPath,
  jumpId,
} from "../options";
const payUnit = {
  price: "贝",
  cash: "元",
};
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      columnsMapProduct,
      dictsMap,
      title: "商品信息",
    };
  },
  methods: {
    moneyJoin(price = 0, cash = 0) {
      const arr = [];
      price && arr.push(price + payUnit["price"]);
      cash && arr.push(cash + payUnit["cash"]);
      return arr.join("/") || "0贝/0元";
    },
    realPay(row) {
      const price = row.paymentMethod === "1";
      const cash = row.paymentMethod === "2";
      if (row.status === "1" && (price || cash)) {
        if (price) return row.discountPrice + "贝";
        if (cash) return row.discountCash + "元";
      }
      return this.moneyJoin(row.discountPrice, row.discountCash);
    },
    realDeductible(row) {
      const price = row.paymentMethod === "1";
      const cash = row.paymentMethod === "2";
      if (row.status === "1" && (price || cash)) {
        if (price) return row.deductiblePrice + "贝";
        if (cash) return row.deductibleCash + "元";
      }
      return this.moneyJoin(row.deductiblePrice, row.deductibleCash);
    },
    orderStatus(status) {
      const obj = {
        label: dictsMap.status[status] || "暂无",
        value: status,
        color: statusColor[status] || "#666769",
      };
      return obj;
    },
    handleClick(row) {
      const { orderType } = row;
      if (jumpPath[orderType]) {
        const path = jumpPath[orderType] + row[jumpId[row.orderType]];
        this.$openPage(path);
      } else {
        this.$message({ message: "订单类型错误", type: "info" });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  color: $--color-text-secondary;
  & > div {
    display: grid;
    grid-template-columns: 100px 1fr;
    margin-bottom: 10px;
    line-height: 24px;
    & > span:first-of-type {
      text-align: right;
    }
    & > span:last-of-type {
      min-width: 100px;
    }
    &:last-of-type {
      margin-bottom: 0;
      & > span:last-of-type {
        font-size: 16px;
        font-weight: 900;
        color: $--color-primary;
      }
    }
  }
}
</style>
