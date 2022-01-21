<template>
  <div>
    <span v-if="scope.row.ticketingType == '1'">0</span>
    <span v-if="scope.row.ticketingType == '2'">{{amount}}</span>
  </div>
</template>
<script>
import { unitMap } from "../options";
export default {
  name: "TicketMoneyColumn",
  props: {
    orderNum: {
      type: Number,
      default: 1,
    },
    scope: {
      type: Object,
      required: true,
    },
  },
  computed: {
    amount() {
      return this.scope.row.payMethodList
        .map(m => {
          return `${m.amount * this.orderNum}${unitMap[m.type]}`;
        })
        .join("/");
    },
  },
};
</script>
