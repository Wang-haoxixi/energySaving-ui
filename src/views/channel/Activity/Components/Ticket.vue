<template>
  <el-card
    class="activity-ticket"
    :body-style="{ padding:'15px 20px',width:'320px',height:'120px',boxSizing:' border-box',}"
    shadow="hover"
    :class="{ active: isChoose, shenhe: ticket.needAudit }"
  >
    <div class="title">
      <el-tag v-if="ticket.ticketingType==='2'" class="red">付费</el-tag>
      <el-tag v-if="ticket.ticketingType==='1'" class="green">免费</el-tag>
      <span class="sub-title iep-ellipsis" :title="ticket.ticketingName">{{ticket.ticketingName}}</span>
    </div>
    <div class="original-price nowrap">
      <template v-if="ticket.ticketingType==='2'">
        <div>
          原价：
          <span style="text-decoration: line-through;">
            <span>{{amountJoin(ticket.canMoney,ticket.money)}}</span>
          </span>
        </div>
        <div v-if="!ticket.allowedRefund" class="cannot-refund">不可退</div>
      </template>
    </div>
    <div class="now-price">
      <span class="nowrap">
        <template v-if="ticket.ticketingType==='2'&&ticket.rank!=='0'">
          <i :class="`el-icon-woneng-v${ticket.rank}`"></i>
          <span>特权价:</span>
          <span
            class="strong"
          >{{amountJoin(amount(ticket.canMoney,ticket.discountRate),amount(ticket.money,ticket.discountRate))}}</span>
        </template>
      </span>
      <span :title="ticket.surplus" class="nowrap">
        <u>余：</u>
        {{ticket.surplus}}
      </span>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "Ticket",
  props: {
    ticket: {
      type: Object,
      required: true,
    },
    isChoose: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    amount(amount, discountRate) {
      if (!amount) return 0;
      const price = Math.floor(amount * discountRate * 100) / 100;
      if (price) {
        return price;
      } else {
        return 0.01;
      }
    },
    amountJoin(canMoney, money) {
      const arr = [];
      canMoney && arr.push(`${canMoney}贝`);
      money && arr.push(`${money}元`);
      return arr.join("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.activity-ticket {
  position: relative;
  cursor: pointer;
  &.shenhe {
    background: linear-gradient(45deg, transparent 50%, $--color-primary 0%);
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-size: 30px 30px;
    border-top-right-radius: 5px;
    &::after {
      content: "审";
      position: absolute;
      top: -2px;
      right: 1px;
      font-size: 14px;
      color: #fff;
    }
  }
  &:nth-child(2) {
    margin-left: 30px;
  }
  &:nth-child(3) {
    margin-left: 30px;
  }
  .title {
    margin-bottom: 14px;
  }
  .sub-title {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    width: 220px;
  }
  .original-price {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    height: 21px;
    color: $--color-text-regular;
    .cannot-refund {
      border-radius: 5px;
      padding: 0 5px;
      color: #fff;
      background-color: #bbb;
    }
  }
  .now-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    font-size: 14px;
    span:nth-child(1) {
      font-size: 14px;
      color: $--color-text-secondary;
      max-width: 200px;
      i {
        font-size: 18px;
        color: $--color-primary;
      }
      .strong {
        font-weight: 400;
        font-size: 16px;
        color: $--color-primary;
      }
    }
    span:nth-child(2) {
      max-width: 70px;
      u {
        text-decoration: none;
        color: #666769;
      }
    }
  }
  &:hover,
  &.active {
    border-color: #f74437;
  }
  ::v-deep .el-tag {
    padding: 0;
    width: 44px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background: rgba(247, 68, 55, 0.1);
    border-radius: 5px;
  }
  .red {
    background-color: $--custom-menu-background-color;
    color: $--color-primary;
    border-color: $--custom-menu-background-color;
  }
  .green {
    background-color: $--secondary-background-color;
    color: $--color-third;
    border-color: $--secondary-background-color;
  }
  .nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
