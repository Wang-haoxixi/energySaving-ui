<template>
  <div>
    <span v-if="scope.row.ticketingType == '1'">0</span>
    <span :class="{strikethrough}" v-if="scope.row.ticketingType == '2'" :title="amount">{{amount}}</span>
  </div>
</template>
<script>
import { unitMap } from "@/views/meetting/options";
export default {
  name: "TicketMoney",
  props: {
    orderNum: {
      type: Number,
      default: 1,
    },
    scope: {
      type: Object,
      required: true,
    },
    strikethrough: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    amount() {
      const money = this.scope.row.money;
      const canMoney = this.scope.row.canMoney;
      const arr = [];
      canMoney && arr.push({ amount: canMoney, type: "WeCanPay" });
      money && arr.push({ amount: money, type: "OfflinePay" });
      return arr
        .map(m => {
          return `${m.amount * this.orderNum}${unitMap[m.type]}`;
        })
        .join("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
