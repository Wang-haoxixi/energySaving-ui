<template>
  <el-card
    :class="small?'activity-card-small':'activity-card'"
    :body-style="{ padding: '0px' }"
    shadow="hover"
  >
    <div @click="$openPage(`/channel/activity/detail/${activity.id}`)">
      <iep-img :resizeOpt="(small?{l:248}:{l:285})" :src="activity.poster" class="image" />
      <div class="content-box">
        <div class="main">
          <div class="title" :title="activity.name">{{activity.name}}</div>
          <div class="bottom">
            <span class="time">{{activity.startTime | parseToDay}}</span>
            <span
              class="address iep-ellipsis"
              :class="{small}"
              :title="(activity.city||activity.cityName)+' '+activity.field"
            >{{activity.city||activity.cityName}} {{activity.field}}</span>
          </div>
        </div>
        <div class="more" v-if="activity.ticketingManagements&&activity.ticketingManagements[0]">
          <span class="iep-ellipsis-flex" :title="`限额${totalNum}人`">限额{{totalNum}}人</span>
          <span v-if="amount" class="money iep-ellipsis-flex" :title="amount">{{amount}}</span>
          <span v-else>免费</span>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
// 活动卡片-用于活动大厅-活动列表等
import { unitMap } from "@/views/meetting/options";

export default {
  name: "IepActivityCard",
  props: {
    activity: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    amount() {
      const { money, canMoney } = this.activity.ticketingManagements[0];
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
      return arr
        .map((m) => {
          return `${m.amount}${unitMap[m.type]}`;
        })
        .join("/");
    },
    totalNum() {
      return this.activity.ticketingManagements.reduce(
        (a, b) => a + b.number,
        0,
      );
    },
  },
};
</script>
<style lang="scss" scoped>
$--card-width: 285px;
$--card-height: 263px;
$--card-width-samll: 248px;
$--card-height-samll: 238px;
.activity-card {
  width: $--card-width;
  height: $--card-height;
}
.activity-card,
.activity-card-small {
  overflow: hidden;
  cursor: pointer;
  .image {
    width: $--card-width;
    height: 170px;
    display: block;
  }
  .content-box {
    box-sizing: border-box;
    padding: 13px;
    width: $--card-width;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 126px;
    background: #ffffff;
    transition: transform 0.5s ease;
    border-top: 1px solid $--border-color;

    .main {
      height: 77px;
    }
    .title {
      height: 42px;
      font-size: 14px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .bottom {
      margin-top: 5px;
      font-size: 12px;
      color: $--color-text-secondary;
      height: 22px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .address {
        margin-left: 20px;
        width: 170px;
      }
      .small {
        width: 130px;
      }
    }
    .more {
      font-size: 12px;
      color: $--color-text-secondary;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .money {
        font-size: 14px;
        color: $--color-primary;
      }
    }
  }
}
.activity-card-small {
  width: $--card-width-samll;
  height: $--card-height-samll;
  .image {
    width: $--card-width-samll;
    height: 150px;
    display: block;
  }
  .content-box {
    padding: 12px;
    width: $--card-width-samll;
    height: 120px;
    .main {
      height: 64px;
    }
    .title {
      height: 40px;
    }
    .bottom {
      margin-top: 4px;
      height: 20px;
    }
  }
}
.activity-card-small:hover .content-box,
.activity-card:hover .content-box {
  transform: translateY(-30px);
}
</style>
