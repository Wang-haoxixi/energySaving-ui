<template>
  <el-card class="activity-card" :body-style="{ padding: '15px' }" shadow="hover">
    <div @click="$openPage(`/channel/activity/detail/${activity.id}`)">
      <iep-img :resizeOpt="{l:330}" :src="activity.poster" class="image" />
      <div class="content-box">
        <div class="main">
          <div class="title iep-ellipsis-flex" :title="activity.name">{{activity.name}}</div>
          <div class="bottom">
            <span class="time">{{activity.startTime | parseToDay}}</span>
            <span
              class="address iep-ellipsis"
              :title="(activity.city||activity.cityName)+' '+activity.field"
            >{{activity.city||activity.cityName}} {{activity.field}}</span>
          </div>
          <div class="bottom footer">
            <iep-tag-read :value="activity.label||[]"></iep-tag-read>
            <span
              class="iep-ellipsis"
              :class="floorPrice.class"
              :title="floorPrice.price"
            >{{floorPrice.price}}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
// 活动卡片-用于组织风采页活动列表
import { unitMap } from "@/views/meetting/options";
export default {
  name: "MeetingItem",
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    amount() {
      const { canMoney, money } = this.activity.ticketingManagements[0];
      const arr = [];
      canMoney &&
        arr.push({
          amount: canMoney,
          type: "WeCanPay",
        });
      money &&
        arr.push({
          amount: money,
          type: "OfflinePay",
        });
      return (
        arr
          .map((m) => {
            return `${m.amount}${unitMap[m.type]}`;
          })
          .join("/") || ""
      );
    },
    floorPrice() {
      const price = this.amount;
      return { price: price || "免费", class: price ? "red" : "green" };
    },
  },
};
</script>
<style lang="scss" scoped>
$--card-width: 360px;
.activity-card {
  width: $--card-width;
}
.activity-card {
  overflow: hidden;
  cursor: pointer;
  .image {
    width: 330px;
    height: 197.83px;
  }
  .content-box {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    transition: transform 0.5s ease;
    border-top: 1px solid $--border-color;
    .title {
      margin-top: 15px;
      font-size: 16px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .bottom {
      margin-top: 5px;
      font-size: 14px;
      color: $--color-text-secondary;
      height: 22px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .address {
        margin-left: 20px;
        width: 220px;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      .red {
        color: $--color-primary;
      }
      .green {
        color: $--color-third;
      }
      span {
        width: 100px;
      }
    }
  }
}
</style>
